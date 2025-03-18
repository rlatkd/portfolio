"use client";

import { useState, useEffect } from 'react';

interface Comment {
  id: number;
  postId: number;
  userName: string;
  content: string;
  createdAt: string;
}

interface CommentsProps {
  postId: number;
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 댓글 목록 가져오기
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/comments?postId=${postId}`);
        
        if (!response.ok) {
          throw new Error('댓글을 불러오는데 실패했습니다.');
        }
        
        const data = await response.json();
        setComments(data);
      } catch (err) {
        console.error('댓글 불러오기 오류:', err);
        setError('댓글을 불러오는데 문제가 발생했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  // 댓글 작성 처리
const handleSubmitComment = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (!newComment.trim()) return;
  
  try {
    // URL 경로를 절대 경로로 확실하게 지정
    const response = await fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        content: newComment,
        userName: userName || '익명',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('서버 응답 오류:', response.status, errorData);
      throw new Error(`댓글 작성 실패 (${response.status}): ${errorData.error || '알 수 없는 오류'}`);
    }

    const createdComment = await response.json();
    
    // 댓글 목록에 추가
    setComments([...comments, createdComment]);
    
    // 입력 필드 초기화
    setNewComment('');
  } catch (err) {
    console.error('댓글 작성 오류:', err);
    alert('댓글 작성 중 오류가 발생했습니다.');
  }
}

  // 날짜 포맷팅 함수
  const formatCommentDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="w-4/6 mx-auto mt-8 mb-12">
      <h2 className="text-xl font-semibold mb-4">댓글</h2>
      
      {/* 댓글 작성 폼 */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="mb-3">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
            placeholder="이름 (선택사항)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <textarea
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-white"
          rows={3}
          placeholder="댓글을 작성해주세요..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={!newComment.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            댓글 작성
          </button>
        </div>
      </form>
      
      {/* 댓글 목록 */}
      <div className="space-y-6">
        {isLoading ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">댓글을 불러오는 중...</p>
        ) : error ? (
          <p className="text-center text-red-500 py-8">{error}</p>
        ) : comments.length === 0 ? (
          <p className="text-center text-gray-500 dark:text-gray-400 py-8">아직 작성된 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="p-4 border border-gray-200 rounded-md dark:border-neutral-800">
              <div className="flex items-center mb-2">
                <div>
                  <p className="font-medium text-sm">{comment.userName}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {formatCommentDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className="text-sm whitespace-pre-line break-words">{comment.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}