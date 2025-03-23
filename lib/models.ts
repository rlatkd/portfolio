import { ObjectId } from 'mongodb';

export interface ReplyType {
  _id?: ObjectId | string;
  userName: string;
  content: string;
  createdAt: Date;
}

export interface CommentType {
  _id?: ObjectId | string;
  postId: string;
  userName: string;
  content: string;
  createdAt: Date;
  replies: ReplyType[];
}