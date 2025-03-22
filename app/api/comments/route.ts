// app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from 'lib/mongodb';
import { ObjectId } from 'mongodb';
import { CommentType } from 'lib/models';

// GET 요청 처리 - 댓글 목록 가져오기
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  if (!postId) {
    return NextResponse.json({ error: '게시물 ID가 필요합니다.' }, { status: 400 });
  }

  // postId를 문자열로 확실하게 처리
  const postIdStr = String(postId);

  try {
    const client = await clientPromise;
    const db = client.db();

    // postId는 문자열로 처리
    const comments = await db.collection('comments')
      .find({ postId: postIdStr })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(comments);
  } catch (error) {
    console.error('댓글 조회 오류:', error);
    return NextResponse.json({ error: '댓글을 불러오는데 실패했습니다.' }, { status: 500 });
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

  // postId를 문자열로 확실하게 변환
  const postIdStr = String(postId);
  
  try {
    console.log('댓글 작성 요청:', { postId: postIdStr, userName, content });
    
    const client = await clientPromise;
    console.log('MongoDB 연결 성공');
    
    const db = client.db();
    console.log('데이터베이스:', db.databaseName);

    // 날짜 객체 생성
    const now = new Date();

    // 새 댓글 생성 (postId를 문자열로 저장)
    const newComment: CommentType = {
      postId: postIdStr,
      userName,
      content,
      createdAt: now,
      replies: [] // 초기에는 답변이 없음
    };

    console.log('삽입할 댓글 데이터:', newComment);

    // 댓글 삽입
    const result = await db.collection('comments').insertOne(newComment);
    console.log('댓글 삽입 결과:', result);

    // 생성된 댓글 ID로 완전한 댓글 정보 조회
    const createdComment = await db.collection('comments').findOne({ _id: result.insertedId });
    console.log('생성된 댓글:', createdComment);

    return NextResponse.json(createdComment, { status: 201 });
  } catch (error) {
    console.error('댓글 작성 오류 상세:', error);
    return NextResponse.json({ error: '댓글 작성에 실패했습니다.' }, { status: 500 });
  }
}