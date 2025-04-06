'use client';

import Link from 'next/link';
import { dateFormatter } from '@/utils/dateFormatter';
import { slugify } from '@/utils/slugify';
import { ArrowRight, Calendar, Tag, Eye } from 'lucide-react';
import { useState, useEffect } from 'react';

type PostsProps = {
  posts: any[];
}

export function Posts({ posts }: PostsProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  return (
    <>
      <div className='grid grid-cols-1 gap-8 mb-12'>
        {posts
          .sort((a, b) => parseInt(b.metadata.index, 10) - parseInt(a.metadata.index, 10))
          .map((post) => (
            <Link
              key={post.slug}
              className='group flex flex-col space-y-1 bg-white/5 backdrop-blur-sm hover:bg-white/10 rounded-xl overflow-hidden transition-all duration-300 relative'
              href={`/posts/${post.slug}`}
              onMouseEnter={() => setHoveredPost(post.slug)}
              onMouseLeave={() => setHoveredPost(null)}
            >
              <div className="relative overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300`}></div>
                <img
                  src={post.metadata.image}
                  alt={post.metadata.title}
                  className={`w-full h-64 object-cover transition-transform duration-700 ${hoveredPost === post.slug ? 'scale-105' : 'scale-100'}`}
                />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                  <span className='text-sm px-3 py-1 rounded-full bg-blue-500/40 text-blue-300 backdrop-blur-sm inline-flex items-center'>
                    <Tag className="w-3.5 h-3.5 mr-1" strokeWidth={2.5} />
                    {post.metadata.category}
                  </span>
                  
                  <h2 className='text-white text-2xl font-semibold mt-3 mb-1 group-hover:text-white/90'>
                    {post.metadata.title}
                  </h2>
                  
                  <p className='text-white/70 line-clamp-2 mb-2 text-sm'>
                    {post.metadata.description || `${post.metadata.title}에 대한 글입니다.`}
                  </p>
                  
                  <div className="flex items-center text-white/60 text-sm">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
                    {dateFormatter(post.metadata.publishedAt, false)}
                  </div>
                </div>
              </div>
              
              <div className='flex justify-between items-center p-4'>
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-xs font-bold text-white">
                    {post.metadata.author ? post.metadata.author.charAt(0).toUpperCase() : 'X'}
                  </div>
                  <span className="ml-2 text-white/70 text-sm">{post.metadata.author || 'XOps'}</span>
                </div>
                
                <div className='flex items-center space-x-4'>
                  <div className="flex items-center text-white/60 text-sm">
                    <Eye className="w-3.5 h-3.5 mr-1.5" strokeWidth={2} />
                    {post.metadata.views || '0'} 읽음
                  </div>
                  
                  <span className="text-blue-400 flex items-center group-hover:text-blue-300 transition-colors">
                    읽기
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
              
              {/* 호버 효과용 그라데이션 테두리 */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/0 via-blue-500/0 to-purple-600/0 group-hover:from-blue-500/20 group-hover:via-indigo-500/20 group-hover:to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </Link>
          ))}
      </div>
    </>
  );
}