'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { dateFormatter } from '@/utils/dateFormatter';
import Image from 'next/image';

type PostRecommendProps = {
  posts: any[];
  currentPostIndex: number;
};

export default function PostRecommend({ posts, currentPostIndex }: PostRecommendProps) {
  const [randomPosts, setRandomPosts] = useState<any[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (!initialized.current && posts && posts.length > 0) {
      const otherPosts = posts.filter((post) => post.metadata.index !== currentPostIndex);
      const shuffledPosts = [...otherPosts].sort(() => Math.random() - 0.5).slice(0, 6); // 6개로 변경
      setRandomPosts(shuffledPosts);
      initialized.current = true;
    }
  }, [posts, currentPostIndex]); 

  if (randomPosts.length === 0) return null;

  return (
    <div className='mt-20 mb-10'>
      <h2 className='text-xl font-semibold mb-4'>관심 있을 만한 포스트</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-12'>
        {randomPosts.map((post) => (
          <Link
            key={post.slug}
            className='flex flex-col bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow'
            href={`/posts/${post.metadata.index}`}
          >
            <div className='relative p-6 flex flex-col h-80'>
              <div>
                <h3 className='text-lg font-bold text-gray-900 mb-1'>{post.metadata.title}</h3>
                <p className='text-gray-700 text-sm mb-4 line-clamp-3'>{post.metadata.description || '본 포스팅은 기술 관련 내용을 다루고 있습니다.'}</p>
              </div>
              
              <div className='mt-auto'>
                <p className='text-gray-500 text-sm mb-1'>{dateFormatter(post.metadata.publishedAt, false)} · {post.metadata.commentCount || 0}개의 댓글</p>
                
                <div className='flex items-center justify-between mt-2'>
                  <div className='flex items-center'>
                    {post.metadata.author && (
                      <>
                        <div className='w-6 h-6 rounded-full overflow-hidden mr-2 bg-gray-300'>
                          {post.metadata.authorImage ? (
                            <Image 
                              src={post.metadata.authorImage} 
                              alt={post.metadata.author}
                              width={24}
                              height={24}
                              className='object-cover'
                            />
                          ) : (
                            <div className='w-full h-full flex items-center justify-center text-xs text-gray-600'>
                              {post.metadata.author.charAt(0)}
                            </div>
                          )}
                        </div>
                        <span className='text-sm font-medium'>by {post.metadata.author}</span>
                      </>
                    )}
                  </div>
                  <div className='flex items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className='text-sm text-gray-500'>{post.metadata.likes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
