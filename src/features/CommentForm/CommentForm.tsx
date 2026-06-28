'use client';

import { useState, useEffect } from 'react';
import { CommentType } from '@/shared/lib/database/models';
import { MessageSquare, CornerDownRight, Send, User } from 'lucide-react';

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
      const apiUrl = `/api/comments/${commentId}/replies`;
      
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
    <div className='w-full mt-12 mb-20 relative'>
      <div className='relative z-10'>
        <h2 className='text-2xl font-serif mb-6 flex items-center text-fg-strong cursor-default'>
          <MessageSquare className='w-5 h-5 mr-2 text-accent' />
          댓글
        </h2>
        <form onSubmit={handleSubmitComment} className='mb-10 border border-line bg-surface p-6 rounded-xl relative'>
          <div className='mb-4'>
            <div className='flex items-center mb-2'>
              <User className='w-4 h-4 mr-2 text-accent' />
              <label className='text-sm text-muted'>이름 (선택사항)</label>
            </div>
            <input
              type='text'
              className='w-full p-3 bg-surface border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-fg placeholder:text-muted'
              placeholder='이름을 입력하세요'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <textarea
            className='w-full h-40 p-4 bg-surface border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-fg placeholder:text-muted'
            placeholder='댓글을 작성해주세요'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className='flex justify-end mt-3'>
            <button
              type='submit'
              disabled={!newComment.trim() || !postId}
              className='px-5 py-2.5 bg-accent text-navy rounded-lg font-medium flex items-center group hover:opacity-90 transition-all disabled:opacity-50'
            >
              댓글 작성
              <Send className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </button>
          </div>
        </form>
        <div className='space-y-6'>
          {isLoading ? (
            <div className='text-center py-12'>
              <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-accent border-r-transparent'></div>
              <p className='mt-4 text-muted'>댓글을 불러오는 중...</p>
            </div>
          ) : error ? (
            <p className='text-center text-red-500 py-8 border border-line bg-surface rounded-xl'>{error}</p>
          ) : comments.length === 0 ? (
            <p className='text-center text-muted py-12 border border-line bg-surface rounded-xl'>아직 작성된 댓글이 없습니다.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id?.toString()} className='border border-line bg-surface p-6 rounded-xl hover:border-accent transition-colors'>
                <div className='flex items-center mb-3'>
                  <div className='p-2 bg-surface-2 rounded-full mr-3'>
                    <User className='w-5 h-5 text-accent' />
                  </div>
                  <div>
                    <p className='font-medium text-fg-strong'>{comment.userName}</p>
                    <p className='font-mono text-xs text-muted'>
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className='text-fg whitespace-pre-line break-words mb-4 pl-10'>{comment.content}</p>
                <div className='pl-10'>
                  <button
                    onClick={() => handleShowReplyForm(comment._id?.toString() || '')}
                    className='text-sm text-accent hover:opacity-80 transition-colors flex items-center'
                  >
                    <CornerDownRight className='w-4 h-4 mr-1' />
                    답변 달기
                  </button>
                </div>
                {comment.replies && comment.replies.length > 0 && (
                  <div className='mt-5 ml-10 pl-5 border-l border-line space-y-4'>
                    <h4 className='text-sm font-medium text-muted'>답변 {comment.replies.length}개</h4>
                    {comment.replies.map((reply) => (
                      <div key={reply._id?.toString()} className='border border-line bg-surface-2 p-4 rounded-lg'>
                        <div className='flex items-center mb-2'>
                          <div className='p-1.5 bg-surface rounded-full mr-2'>
                            <User className='w-3.5 h-3.5 text-accent' />
                          </div>
                          <p className='font-medium text-sm text-fg-strong'>{reply.userName}</p>
                          <p className='font-mono text-xs text-muted ml-2'>
                            {formatDate(reply.createdAt)}
                          </p>
                        </div>
                        <p className='text-sm text-fg whitespace-pre-line break-words ml-7'>{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
                {replyToId === comment._id?.toString() && (
                  <div className='mt-4 ml-10 pl-5 border-l border-line'>
                    <div className='border border-line bg-surface-2 p-4 rounded-lg'>
                      <div className='mb-3'>
                        <div className='flex items-center mb-1'>
                          <User className='w-3.5 h-3.5 mr-1.5 text-accent' />
                          <label className='text-xs text-muted'>이름 (선택사항)</label>
                        </div>
                        <input
                          type='text'
                          className='w-full p-2 text-sm bg-surface border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-fg placeholder:text-muted'
                          placeholder='이름을 입력하세요'
                          value={replyUserName}
                          onChange={(e) => setReplyUserName(e.target.value)}
                        />
                      </div>
                      <textarea
                        className='w-full p-3 text-sm bg-surface border border-line rounded-lg focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent text-fg placeholder:text-muted'
                        rows={2}
                        placeholder='답변을 작성해주세요...'
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                      <div className='flex justify-end space-x-2 mt-3'>
                        <button
                          type='button'
                          onClick={handleCancelReply}
                          className='px-3 py-1.5 text-xs border border-line text-fg rounded-lg hover:border-accent hover:text-accent transition-colors'
                        >
                          취소
                        </button>
                        <button
                          type='button'
                          onClick={() => handleSubmitReply(comment._id?.toString() || '')}
                          disabled={!replyContent.trim()}
                          className='px-3 py-1.5 text-xs bg-accent text-navy rounded-lg flex items-center disabled:opacity-50 group hover:opacity-90 transition-all'
                        >
                          답변 작성
                          <Send className='ml-1.5 w-3 h-3 group-hover:translate-x-1 transition-transform' />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
