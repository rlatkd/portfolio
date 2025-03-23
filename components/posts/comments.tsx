'use client';

import { useState, useEffect } from 'react';
import { CommentType } from '@/lib/models';

interface CommentsProps {
  postId: string;
}

export default function Comments({ postId }: CommentsProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [replyToId, setReplyToId] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [replyUserName, setReplyUserName] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        setIsLoading(true);
        const apiUrl = `/api/posts/${postId}/comments`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`댓글 목록 조회 실패 (${response.status}): ${errorData.error || '알 수 없는 오류'}`);
        }
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError('댓글을 불러오는데 문제 발생');
      } finally {
        setIsLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    } else {
      setError('게시물 ID가 없어 댓글을 불러올 수 없습니다.');
      setIsLoading(false);
    }
  }, [postId]);

  // 댓글 작성 처리
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newComment.trim()) return;
    
    try {
      const apiUrl = `/api/posts/${postId}/comments`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newComment,
          userName: userName || '익명',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`댓글 작성 실패 (${response.status}): ${errorData.error || '알 수 없는 오류'}`);
      }

      const createdComment = await response.json();
      setComments([createdComment, ...comments]);
      setNewComment('');
    } catch (err) {
      alert('댓글 작성 중 오류 발생');
    }
  };

  // 답변 작성 폼 표시
  const handleShowReplyForm = (commentId: string) => {
    setReplyToId(commentId);
    setReplyContent('');
  };

  // 답변 취소
  const handleCancelReply = () => {
    setReplyToId(null);
    setReplyContent('');
  };

  // 답변 제출
  const handleSubmitReply = async (commentId: string) => {
    if (!replyContent.trim()) return;
    
    try {
      const apiUrl = `/api/posts/${postId}/comments/${commentId}/replies`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: replyContent,
          userName: replyUserName || '익명',
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`답변 작성 실패: ${errorData.error || '알 수 없는 오류'}`);
      }

      const newReply = await response.json();
      
      // 댓글 목록 업데이트
      setComments(comments.map(comment => {
        if (comment._id === commentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          };
        }
        return comment;
      }));
      
      // 폼 초기화
      setReplyToId(null);
      setReplyContent('');
    } catch (err) {
      console.error('답변 작성 오류:', err);
      alert('답변 작성 중 오류가 발생했습니다.');
    }
  };

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string | Date) => {
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
    <div className='w-4/6 mx-auto mt-8 mb-12'>
      <h2 className='text-xl font-semibold mb-4'>댓글</h2>
      <form onSubmit={handleSubmitComment} className='mb-8'>
        <div className='mb-3'>
          <input
            type='text'
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black'
            placeholder='이름 (선택사항)'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <textarea
          className='w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black'
          rows={3}
          placeholder='댓글을 작성해주세요...'
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <div className='flex justify-end mt-2'>
          <button
            type='submit'
            disabled={!newComment.trim() || !postId}
            className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
          >
            댓글 작성
          </button>
        </div>
      </form>
      <div className='space-y-6'>
        {isLoading ? (
          <p className='text-center text-gray-500 dark:text-gray-400 py-8'>댓글을 불러오는 중...</p>
        ) : error ? (
          <p className='text-center text-red-500 py-8'>{error}</p>
        ) : comments.length === 0 ? (
          <p className='text-center text-gray-500 dark:text-gray-400 py-8'>아직 작성된 댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id?.toString()} className='p-4 border border-gray-200 rounded-md dark:border-neutral-800'>
              <div className='flex items-center mb-2'>
                <div>
                  <p className='font-medium text-sm'>{comment.userName}</p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    {formatDate(comment.createdAt)}
                  </p>
                </div>
              </div>
              <p className='text-sm whitespace-pre-line break-words mb-3'>{comment.content}</p>
              <button 
                onClick={() => handleShowReplyForm(comment._id?.toString() || '')}
                className='text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mt-1'
              >
                답변 달기
              </button>
              {comment.replies && comment.replies.length > 0 && (
                <div className='mt-4 pl-4 border-l-2 border-gray-200 dark:border-neutral-700 space-y-3'>
                  <h4 className='text-sm font-medium'>답변 {comment.replies.length}개</h4>
                  {comment.replies.map((reply) => (
                    <div key={reply._id?.toString()} className='p-2 bg-gray-50 dark:bg-neutral-900 rounded'>
                      <div className='flex items-center mb-1'>
                        <p className='font-medium text-xs'>{reply.userName}</p>
                        <p className='text-xs text-gray-500 dark:text-gray-400 ml-2'>
                          {formatDate(reply.createdAt)}
                        </p>
                      </div>
                      <p className='text-xs whitespace-pre-line break-words'>{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
              {replyToId === comment._id?.toString() && (
                <div className='mt-3 pl-4 border-l-2 border-gray-200 dark:border-neutral-700'>
                  <div className='mb-2'>
                    <input
                      type='text'
                      className='w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black'
                      placeholder='이름 (선택사항)'
                      value={replyUserName}
                      onChange={(e) => setReplyUserName(e.target.value)}
                    />
                  </div>
                  <textarea
                    className='w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-black'
                    rows={2}
                    placeholder='답변을 작성해주세요...'
                    value={replyContent}
                    onChange={(e) => setReplyContent(e.target.value)}
                  />
                  <div className='flex justify-end space-x-2 mt-2'>
                    <button
                      type='button'
                      onClick={handleCancelReply}
                      className='px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none dark:bg-neutral-700 dark:text-gray-200 dark:hover:bg-neutral-600'
                    >
                      취소
                    </button>
                    <button
                      type='button'
                      onClick={() => handleSubmitReply(comment._id?.toString() || '')}
                      disabled={!replyContent.trim()}
                      className='px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed'
                    >
                      답변 작성
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
