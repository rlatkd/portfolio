'use client';

import { useState, useEffect } from 'react';
import { CommentType } from '@/lib/models';
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
    <div className='w-4/6 mx-auto mt-12 mb-20 relative'>
      <div className='absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl'></div>
      <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl'></div>
      <div className='relative z-10'>
        <h2 className='text-2xl font-bold mb-6 flex items-center text-white/90 cursor-default'>
          <MessageSquare className='w-5 h-5 mr-2 text-blue-400' />
          댓글
        </h2>        
        <form onSubmit={handleSubmitComment} className='mb-10 bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 relative'>
          <div className='mb-4'>
            <div className='flex items-center mb-2'>
              <User className='w-4 h-4 mr-2 text-blue-400' />
              <label className='text-sm text-white/70'>이름 (선택사항)</label>
            </div>
            <input
              type='text'
              className='w-full p-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder:text-white/30'
              placeholder='이름을 입력하세요'
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <textarea
            className='w-full h-40 p-4 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-white placeholder:text-white/30'
            placeholder='댓글을 작성해주세요'
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className='flex justify-end mt-3'>
            <button
              type='submit'
              disabled={!newComment.trim() || !postId}
              className='px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium text-white flex items-center group hover:opacity-95 transition-all disabled:opacity-50'
            >
              댓글 작성
              <Send className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </button>
          </div>
        </form>
        <div className='space-y-6'>
          {isLoading ? (
            <div className='text-center py-12'>
              <div className='inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-400 border-r-transparent'></div>
              <p className='mt-4 text-white/50'>댓글을 불러오는 중...</p>
            </div>
          ) : error ? (
            <p className='text-center text-red-400 py-8 bg-white/5 backdrop-blur-sm rounded-xl'>{error}</p>
          ) : comments.length === 0 ? (
            <p className='text-center text-white/50 py-12 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10'>아직 작성된 댓글이 없습니다.</p>
          ) : (
            comments.map((comment) => (
              <div key={comment._id?.toString()} className='bg-white/5 backdrop-blur-sm p-6 rounded-xl border border-white/10 hover:bg-white/8 transition-all'>
                <div className='flex items-center mb-3'>
                  <div className='p-2 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full mr-3'>
                    <User className='w-5 h-5 text-blue-400' />
                  </div>
                  <div>
                    <p className='font-medium'>{comment.userName}</p>
                    <p className='text-xs text-white/40'>
                      {formatDate(comment.createdAt)}
                    </p>
                  </div>
                </div>
                <p className='text-white/80 whitespace-pre-line break-words mb-4 pl-10'>{comment.content}</p>
                <div className='pl-10'>
                  <button 
                    onClick={() => handleShowReplyForm(comment._id?.toString() || '')}
                    className='text-sm text-blue-400 hover:text-blue-300 transition-colors flex items-center'
                  >
                    <CornerDownRight className='w-4 h-4 mr-1' />
                    답변 달기
                  </button>
                </div>
                {comment.replies && comment.replies.length > 0 && (
                  <div className='mt-5 ml-10 pl-5 border-l border-white/10 space-y-4'>
                    <h4 className='text-sm font-medium text-white/70'>답변 {comment.replies.length}개</h4>
                    {comment.replies.map((reply) => (
                      <div key={reply._id?.toString()} className='bg-white/5 backdrop-blur-sm p-4 rounded-lg'>
                        <div className='flex items-center mb-2'>
                          <div className='p-1.5 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-full mr-2'>
                            <User className='w-3.5 h-3.5 text-purple-400' />
                          </div>
                          <p className='font-medium text-sm'>{reply.userName}</p>
                          <p className='text-xs text-white/40 ml-2'>
                            {formatDate(reply.createdAt)}
                          </p>
                        </div>
                        <p className='text-sm text-white/70 whitespace-pre-line break-words ml-7'>{reply.content}</p>
                      </div>
                    ))}
                  </div>
                )}
                {replyToId === comment._id?.toString() && (
                  <div className='mt-4 ml-10 pl-5 border-l border-white/10'>
                    <div className='bg-white/5 backdrop-blur-sm p-4 rounded-lg'>
                      <div className='mb-3'>
                        <div className='flex items-center mb-1'>
                          <User className='w-3.5 h-3.5 mr-1.5 text-purple-400' />
                          <label className='text-xs text-white/60'>이름 (선택사항)</label>
                        </div>
                        <input
                          type='text'
                          className='w-full p-2 text-sm bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-white/30'
                          placeholder='이름을 입력하세요'
                          value={replyUserName}
                          onChange={(e) => setReplyUserName(e.target.value)}
                        />
                      </div>
                      <textarea
                        className='w-full p-3 text-sm bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white placeholder:text-white/30'
                        rows={2}
                        placeholder='답변을 작성해주세요...'
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                      />
                      <div className='flex justify-end space-x-2 mt-3'>
                        <button
                          type='button'
                          onClick={handleCancelReply}
                          className='px-3 py-1.5 text-xs bg-white/10 rounded-lg hover:bg-white/15 transition-all text-white/70'
                        >
                          취소
                        </button>
                        <button
                          type='button'
                          onClick={() => handleSubmitReply(comment._id?.toString() || '')}
                          disabled={!replyContent.trim()}
                          className='px-3 py-1.5 text-xs bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center disabled:opacity-50 group'
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
