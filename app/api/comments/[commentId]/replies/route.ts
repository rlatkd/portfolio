import { NextRequest, NextResponse } from 'next/server';
import clientPromise from 'lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET (request: NextRequest, { params }: { params: { commentId: string } }) {
  const { commentId } = params;
  
  if (!commentId) {
    return NextResponse.json({ error: '댓글 ID가 필요합니다.' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db();

    let objectCommentId;
    try {
      objectCommentId = new ObjectId(commentId);
    } catch (error) {
      return NextResponse.json({ error: '유효하지 않은 댓글 ID 형식입니다.' }, { status: 400 });
    }

    const comment = await db.collection('comments').findOne({ _id: objectCommentId });

    if (!comment) {
      return NextResponse.json({ error: '댓글을 찾을 수 없습니다.' }, { status: 404 });
    }

    return NextResponse.json(comment.replies || []);
  } catch (error) {
    return NextResponse.json({ error: '답변을 불러오는데 실패했습니다.' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { commentId: string } }) {
    const { commentId } = params;
    const body = await request.json();
    const { userName = '익명', content } = body;
  
    try {
      console.log('답변 작성 요청 받음:', { commentId, userName, content });
      
      const client = await clientPromise;
      const db = client.db();
  
      // 먼저 댓글이 존재하는지 직접 확인
      console.log('찾을 댓글 ID:', commentId);
      const existingComment = await db.collection('comments').findOne({ 
        _id: new ObjectId(commentId) 
      });
      
      console.log('조회된 댓글:', existingComment);
  
      if (!existingComment) {
        return NextResponse.json({ error: '댓글을 찾을 수 없습니다.' }, { status: 404 });
      }
  
      // 새 답변 생성
      const newReply = {
        _id: new ObjectId(), // 답변에도 고유 ID 부여
        userName,
        content,
        createdAt: new Date()
      };
  
      console.log('삽입할 답변 데이터:', newReply);
  
      // 댓글에 답변 추가
      const result = await db.collection('comments').updateOne(
        { _id: new ObjectId(commentId) },
        { $push: { replies: newReply } }
      );
      
      console.log('답변 추가 결과:', result);
  
      if (result.matchedCount === 0) {
        return NextResponse.json({ error: '댓글 업데이트 실패.' }, { status: 500 });
      }
  
      // 업데이트된 댓글 조회
      const updatedComment = await db.collection('comments').findOne({ 
        _id: new ObjectId(commentId) 
      });
      
      // 방금 추가된 답변 찾기
      const addedReply = updatedComment?.replies.slice(-1)[0];
      console.log('추가된 답변:', addedReply);
  
      return NextResponse.json(addedReply, { status: 201 });
    } catch (error) {
      console.error('답변 작성 오류 상세:', error);
      return NextResponse.json({ error: '답변 작성에 실패했습니다.' }, { status: 500 });
    }
  }
