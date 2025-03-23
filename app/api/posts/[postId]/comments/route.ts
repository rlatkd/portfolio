import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { CommentType } from '@/lib/models';

export async function GET(request: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params;
  
  if (!postId) {
    return NextResponse.json({ error: '게시물 ID 필요' }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db('posts');
    const comments = await db.collection('comments')
      .find({ postId: postId })
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({ error: '댓글 로딩 실패' }, { status: 500 });
  }
}

export async function POST(request: NextRequest, { params }: { params: { postId: string } }) {
  const { postId } = params;
  const body = await request.json();
  const { userName = '익명', content } = body;

  if (!postId) {
    return NextResponse.json({ error: '게시물 ID 필요' }, { status: 400 });
  }

  if (!content || content.trim() === '') {
    return NextResponse.json({ error: '댓글 내용 필요' }, { status: 400 });
  }
  
  try {
    const client = await clientPromise;
    const db = client.db('posts');
    const now = new Date();
    const newComment: CommentType = {
      postId: postId,
      userName,
      content,
      createdAt: now,
      replies: []
    };
    const result = await db.collection('comments').insertOne(newComment);
    const createdComment = await db.collection('comments').findOne({ _id: result.insertedId });
    
    return NextResponse.json(createdComment, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: '댓글 작성 실패' }, { status: 500 });
  }
}
