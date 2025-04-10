'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { dateFormatter } from '@/utils/dateFormatter';
import Image from 'next/image';
import { MessageSquare, Heart, BookOpen, ArrowRight } from 'lucide-react';

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
      const shuffledPosts = [...otherPosts].sort(() => Math.random() - 0.5).slice(0, 6);
      setRandomPosts(shuffledPosts);
      initialized.current = true;
    }
  }, [posts, currentPostIndex]); 

  if (randomPosts.length === 0) return null;

  return (
    <div className='w-full mx-auto mt-20 mb-16 relative'>
      <div className='absolute -top-40 -right-20 w-60 h-60 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl'></div>
      <div className='absolute -bottom-20 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl'></div>
      <div className='relative z-10'>
        <h2 className='text-2xl font-bold mb-8 flex items-center text-white/90 cursor-default'>
          <BookOpen className='w-5 h-5 mr-2 text-blue-400' />
          관심 있을 만한 포스트
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {randomPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className='bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:bg-white/8 transition-all group'
            >
              <div className='p-6 flex flex-col h-80 relative'>
                <div className='absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-blue-500/10 to-transparent rounded-bl-3xl'></div>
                
                <div className='relative'>
                  <h3 className='text-lg font-bold text-white/90 mb-2 group-hover:text-blue-400 transition-colors'>{post.metadata.title}</h3>
                  <p className='text-white/60 text-sm mb-4 line-clamp-3'>{post.metadata.description || '본 포스팅은 기술 관련 내용을 다루고 있습니다.'}</p>
                </div>
                
                <div className='mt-auto'>
                  <div className='flex items-center space-x-3 mb-3 text-white/50 text-xs'>
                    <div className='flex items-center'>
                      <MessageSquare className='w-3.5 h-3.5 mr-1.5 text-blue-400/70' />
                      {post.metadata.commentCount || 0}
                    </div>
                    <div className='flex items-center'>
                      <Heart className='w-3.5 h-3.5 mr-1.5 text-purple-400/70' />
                      {post.metadata.likes || 0}
                    </div>
                    <span>{dateFormatter(post.metadata.publishedAt, false)}</span>
                  </div>
                  
                  <div className='pt-3 border-t border-white/10 flex items-center justify-between'>
                    {post.metadata.author && (
                      <div className='flex items-center'>
                        <div className='w-7 h-7 rounded-full overflow-hidden mr-2 bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center'>
                          {post.metadata.authorImage ? (
                            <Image 
                              src={post.metadata.authorImage} 
                              alt={post.metadata.author}
                              width={28}
                              height={28}
                              className='object-cover'
                            />
                          ) : (
                            <span className='text-xs font-medium text-white'>
                              {post.metadata.author.charAt(0)}
                            </span>
                          )}
                        </div>
                        <span className='text-sm font-medium text-white/80'>by {post.metadata.author}</span>
                      </div>
                    )}
                    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-blue-500/20 group-hover:bg-blue-500/50 transition-colors'>
                      <ArrowRight className='w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition-transform' />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
