'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Calendar, Clock, Bookmark } from 'lucide-react';

const dummyBlogPosts = [
  {
    id: 1,
    title: 'Next.js 13과 React Server Components 완벽 가이드',
    excerpt: '새로운 앱 라우터와 서버 컴포넌트를 활용한 개발 경험 개선 방법을 알아봅니다.',
    date: '2025-04-05',
    readTime: '8분',
    category: { name: '웹 개발', color: 'bg-blue-400/20 text-blue-400' },
    featured: true,
    image: 'https://via.placeholder.com/800x450' // TODO 실제로는 로컬 이미지
  },
  {
    id: 2,
    title: 'TailwindCSS로 모던 UI 디자인 구현하기',
    excerpt: '유틸리티 우선 CSS 프레임워크로 효율적인 UI 개발 워크플로우를 구축해 봅니다.',
    date: '2025-03-22',
    readTime: '6분',
    category: { name: 'UI/UX', color: 'bg-purple-400/20 text-purple-400' }
  },
  {
    id: 3,
    title: 'TypeScript 5.0 신기능 총정리',
    excerpt: '타입스크립트 최신 버전의 주요 기능과 개선사항을 살펴봅니다.',
    date: '2025-03-15',
    readTime: '5분',
    category: { name: '프로그래밍', color: 'bg-green-400/20 text-green-400' }
  },
  {
    id: 4,
    title: '클라우드 컴퓨팅의 미래: 서버리스와 엣지 컴퓨팅',
    excerpt: '변화하는 클라우드 인프라 트렌드와 개발자가 준비해야 할 기술을 탐색합니다.',
    date: '2025-03-08',
    readTime: '7분',
    category: { name: '클라우드', color: 'bg-orange-400/20 text-orange-400' }
  }
];

export default function Blog() {
  const [isHovering, setIsHovering] = useState(null);
  const featuredPost = dummyBlogPosts.find(post => post.featured);
  const regularPosts = dummyBlogPosts.filter(post => !post.featured).slice(0, 3);

  return (
    <div className='mb-20 max-w-4xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-white/90 cursor-default'>최근 포스트</h2>
        <Link href='/blog' className='text-blue-400 hover:text-blue-300 flex items-center opacity-80 hover:opacity-100 transition-opacity'>
          모두 보기 <ArrowRight className='ml-1 w-4 h-4' />
        </Link>
      </div>
      {featuredPost && (
        <Link href={`/blog/${featuredPost.id}`} passHref>
          <div 
            className='mb-8 bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all cursor-pointer relative'
            onMouseEnter={() => setIsHovering('featured')}
            onMouseLeave={() => setIsHovering(null)}
          >
            <div className='md:flex'>
              <div className='md:w-3/5 p-6 md:p-8 flex flex-col justify-center'>
                <div className='mb-3'>
                  <span className={`text-xs px-3 py-1 rounded-full ${featuredPost.category.color}`}>
                    {featuredPost.category.name}
                  </span>
                </div>
                <h3 className='text-2xl font-bold mb-3 text-white/90 group-hover:text-white transition-colors'>
                  {featuredPost.title}
                </h3>
                <p className='text-white/70 mb-4'>{featuredPost.excerpt}</p>
                <div className='flex items-center text-white/60 text-sm mt-auto'>
                  <Calendar className='w-4 h-4 mr-1' />
                  <span>{new Date(featuredPost.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span className='mx-2'>•</span>
                  <Clock className='w-4 h-4 mr-1' />
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <div className='md:w-2/5 aspect-[4/3] md:aspect-auto bg-gradient-to-r from-blue-500/30 to-purple-500/30 relative overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center text-white/30'>
                  <Bookmark className='w-16 h-16' />
                </div>
                {isHovering === 'featured' && (
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center'>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>
      )}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {regularPosts.map((post, index) => (
          <Link key={post.id} href={`/blog/${post.id}`} passHref>
            <div 
              className='bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/10 transition-all h-full cursor-pointer group'
              onMouseEnter={() => setIsHovering(post.id)}
              onMouseLeave={() => setIsHovering(null)}
            >
              <div className='aspect-[3/2] bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative overflow-hidden'>
                <div className='absolute inset-0 flex items-center justify-center text-white/30'>
                  <Bookmark className='w-10 h-10' />
                </div>
                {isHovering === post.id && (
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center'>
                  </div>
                )}
              </div>
              <div className='p-5'>
                <div className='mb-2'>
                  <span className={`text-xs px-2 py-1 rounded-full ${post.category.color}`}>
                    {post.category.name}
                  </span>
                </div>
                <h3 className='text-lg font-semibold mb-2 text-white/90 group-hover:text-white transition-colors line-clamp-2'>
                  {post.title}
                </h3>
                <p className='text-white/70 text-sm mb-3 line-clamp-2'>{post.excerpt}</p>
                <div className='flex items-center text-white/60 text-xs mt-auto'>
                  <Calendar className='w-3 h-3 mr-1' />
                  <span>{new Date(post.date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                  <span className='mx-2'>•</span>
                  <Clock className='w-3 h-3 mr-1' />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
