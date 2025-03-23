import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request: NextRequest, { params }: { params: { postId: string, commentId: string } }) {
  const { commentId } = params;
  
  if (!commentId) {
    return NextResponse.json({ error: '댓글 ID 필요' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('posts');

    let objectCommentId;
    try {
      objectCommentId = new ObjectId(commentId);
    } catch (error) {
      return NextResponse.json({ error: '유효하지 않은 댓글 ID 형식' }, { status: 400 });
    }

    const comment = await db.collection('comments').findOne({ _id: objectCommentId });

    if (!comment) {
      return NextResponse.json({ error: '댓글 로딩 실패' }, { status: 404 });
    }

    return NextResponse.json(comment.replies || []);
  } catch (error) {
    return NextResponse.json({ error: '답변 조회 실패' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { postId: string, commentId: string } }) {
  const { commentId } = params;
  const body = await request.json();
  const { userName = '익명', content } = body;
  
  if (!content || content.trim() === '') {
    return NextResponse.json({ error: '답변 내용 필요' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('posts');
    let objectCommentId;

    try {
      objectCommentId = new ObjectId(commentId);
    } catch (error) {
      return NextResponse.json({ error: '유효하지 않은 댓글 ID 형식' }, { status: 400 });
    }
    
    const existingComment = await db.collection('comments').findOne({ 
      _id: objectCommentId 
    });
    
    if (!existingComment) {
      return NextResponse.json({ error: '댓글 로딩 실패' }, { status: 404 });
    }
  
    const newReply = {
      _id: new ObjectId(),
      userName,
      content,
      createdAt: new Date()
    };
  
    const result = await db.collection('comments').updateOne(
      { _id: objectCommentId },
      { $push: { replies: newReply } }
    );
    
    if (result.matchedCount === 0) {
      return NextResponse.json({ error: '댓글 수정 실패' }, { status: 500 });
    }
  
    const updatedComment = await db.collection('comments').findOne({ 
      _id: objectCommentId 
    });
    
    const addedReply = updatedComment?.replies.slice(-1)[0];
  
    return NextResponse.json(addedReply, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '답변 작성 실패' }, { status: 500 });
  }
}
