'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Bookmark } from 'lucide-react';
import { getPosts } from '@/lib/markdown';

export default function Post() {
  const [isHovering, setIsHovering] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const allPosts = await getPosts();
        const sortedPosts = allPosts.sort((a, b) => b.metadata.index - a.metadata.index);
        const recentPosts = sortedPosts.slice(0, 1); // 가져올 post 수
        
        setPosts(recentPosts);
      } catch (error) {
        console.error("포스트 데이터를 불러오는 중 오류 발생:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, []);

  // 스켈레톤
  if (isLoading) {
    return (
      <div className='mb-20 max-w-4xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl font-bold text-white/90 cursor-default'>최신 포스트</h2>
          <Link href='/posts' className='text-blue-400 hover:text-blue-300 flex items-center opacity-80 hover:opacity-100 transition-opacity'>
            모두 보기 <ArrowRight className='ml-1 w-4 h-4' />
          </Link>
        </div>
        <div>
          <div className='bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden h-64 animate-pulse'>
            <div className='md:flex h-full'>
              <div className='md:w-3/5 p-8 flex flex-col justify-center'>
                <div className='w-24 h-6 bg-white/10 rounded-full mb-4'></div>
                <div className='w-full h-8 bg-white/10 rounded-lg mb-4'></div>
                <div className='w-full h-4 bg-white/10 rounded-lg mb-2'></div>
                <div className='w-3/4 h-4 bg-white/10 rounded-lg mb-6'></div>
                <div className='w-48 h-4 bg-white/10 rounded-lg'></div>
              </div>
              <div className='md:w-2/5 h-full bg-white/10'></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className='mb-20 max-w-4xl mx-auto'>
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl font-bold text-white/90 cursor-default'>최신 포스트</h2>
          <Link href='/posts' className='text-blue-400 hover:text-blue-300 flex items-center opacity-80 hover:opacity-100 transition-opacity'>
            모두 보기 <ArrowRight className='ml-1 w-4 h-4' />
          </Link>
        </div>
        <div className='bg-white/5 backdrop-blur-sm rounded-xl p-12 text-center'>
          <p className='text-white/70'>아직 작성된 포스트가 없습니다.</p>
        </div>
      </div>
    );
  }
  return (
    <div className='mb-20 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-white/90 cursor-default'>최신 포스트</h2>
        <Link href='/posts' className='text-blue-400 hover:text-blue-300 flex items-center opacity-80 hover:opacity-100 transition-opacity'>
          모두 보기 <ArrowRight className='ml-1 w-4 h-4' />
        </Link>
      </div>
      <div>
        {posts.map((post) => (
          <div key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <div 
                className='bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all cursor-pointer relative'
                onMouseEnter={() => setIsHovering(post.slug)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <div className='md:flex h-64'>
                  <div className='md:w-3/5 p-6 md:p-8 flex flex-col justify-center'>
                    <div className='mb-3'>
                      <span className='text-xs px-3 py-1 rounded-full bg-blue-500/40 text-blue-300 backdrop-blur-sm inline-flex items-center'>
                        {post.metadata.category || '블로그'}
                      </span>
                    </div>
                    <h3 className='text-2xl font-bold mb-3 text-white/90 group-hover:text-white transition-colors'>
                      {post.metadata.title}
                    </h3>
                    <p className='text-white/70 mb-4 line-clamp-2'>
                      {post.metadata.description || `${post.metadata.title}에 대한 글입니다.`}
                    </p>
                    <div className='flex items-center text-white/60 text-sm mt-auto'>
                      <Calendar className='w-4 h-4 mr-1' />
                      <span>{new Date(post.metadata.publishedAt).toLocaleDateString('ko-KR', { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</span>
                      
                      {post.metadata.readTime && (
                        <>
                          <span className='mx-2'>•</span>
                          <Clock className='w-4 h-4 mr-1' />
                          <span>{post.metadata.readTime}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className='md:w-2/5 h-full relative overflow-hidden'>
                    {post.metadata.image ? (
                      <img
                        src={post.metadata.image}
                        alt={post.metadata.title}
                        className='w-full h-full object-cover'
                      />
                    ) : (
                      <div className='w-full h-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 flex items-center justify-center'>
                        <Bookmark className='w-16 h-16 text-white/30' />
                      </div>
                    )}
                    
                    {isHovering === post.slug && (
                      <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center'></div>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
