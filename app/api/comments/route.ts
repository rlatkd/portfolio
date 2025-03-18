import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

// MySQL 연결 설정
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'rlatkd',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'blog'
};

// MySQL 연결 함수
async function connectToDatabase() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    return connection;
  } catch (error) {
    console.error('데이터베이스 연결 오류:', error);
    throw new Error('데이터베이스 연결에 실패했습니다.');
  }
}

// GET 요청 처리 - 댓글 목록 가져오기
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: '게시물 ID가 필요합니다.' }, { status: 400 });
  }

  let connection;
  try {
    connection = await connectToDatabase();

    const [rows] = await connection.execute(
      'SELECT * FROM comments WHERE post_id = ? ORDER BY created_at DESC',
      [postId]
    );

    // 컬럼명 스네이크 케이스에서 카멜 케이스로 변환
    const comments = (rows as any[]).map(row => ({
      id: row.id,
      postId: row.post_id,
      userName: row.user_name,
      content: row.content,
      createdAt: row.created_at
    }));

    return NextResponse.json(comments);
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    return NextResponse.json({ error: '댓글을 불러오는데 실패했습니다.' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}

// POST 요청 처리 - 댓글 작성
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { postId, userName = '익명', content } = body;

  if (!postId) {
    return NextResponse.json({ error: '게시물 ID가 필요합니다.' }, { status: 400 });
  }

  if (!content || content.trim() === '') {
    return NextResponse.json({ error: '댓글 내용이 필요합니다.' }, { status: 400 });
  }

  let connection;
  try {
    connection = await connectToDatabase();

    // 게시물 존재 여부 확인
    // const [posts] = await connection.execute(
    //   'SELECT id FROM posts WHERE id = ?',
    //   [postId]
    // );

    // if ((posts as any[]).length === 0) {
    //   return NextResponse.json({ error: '존재하지 않는 게시물입니다.' }, { status: 404 });
    // }

    // 댓글 삽입
    const [result] = await connection.execute(
      'INSERT INTO comments (post_id, user_name, content) VALUES (?, ?, ?)',
      [postId, userName, content]
    );

    const commentId = (result as any).insertId;

    // 삽입된 댓글 정보 조회
    const [comments] = await connection.execute(
      'SELECT * FROM comments WHERE id = ?',
      [commentId]
    );

    if ((comments as any[]).length === 0) {
      return NextResponse.json({ error: '댓글 작성에 실패했습니다.' }, { status: 500 });
    }

    const comment = (comments as any[])[0];

    return NextResponse.json({
      id: comment.id,
      postId: comment.post_id,
      userName: comment.user_name,
      content: comment.content,
      createdAt: comment.created_at
    }, { status: 201 });
  } catch (error) {
    console.error('댓글 작성 오류:', error);
    return NextResponse.json({ error: '댓글 작성에 실패했습니다.' }, { status: 500 });
  } finally {
    if (connection) await connection.end();
  }
}