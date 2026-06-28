'use client';

import Link from 'next/link';
import { dateFormatter } from '@/shared/utils/dateFormatter';
import { Calendar, Tag, Clock, Bookmark } from 'lucide-react';
import { useState } from 'react';

type PostsProps = {
  posts: any[];
}

export function Posts({ posts }: PostsProps) {
  const [hoveredPost, setHoveredPost] = useState<string | null>(null);

  return (
    <div className='space-y-12 mb-12 relative'>
      {posts
        .sort((a, b) => parseInt(b.metadata.index, 10) - parseInt(a.metadata.index, 10))
        .map((post) => (
          <div key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <div
                className='border border-line bg-surface rounded-xl overflow-hidden group hover:border-accent transition-colors cursor-pointer relative'
                onMouseEnter={() => setHoveredPost(post.slug)}
                onMouseLeave={() => setHoveredPost(null)}
              >
                <div className='md:flex h-64'>
                  <div className='md:w-3/5 p-6 md:p-8 flex flex-col justify-center'>
                    <div className='mb-3'>
                      <span className='rounded border border-line bg-surface-2 px-2.5 py-1 font-mono text-xs text-fg inline-flex items-center'>
                        <Tag className='w-3.5 h-3.5 mr-1' strokeWidth={2.5} />
                        {post.metadata.category}
                      </span>
                    </div>
                    <h3 className='text-2xl font-serif mb-3 text-fg-strong group-hover:text-accent transition-colors'>
                      {post.metadata.title}
                    </h3>
                    <p className='text-fg mb-4'>{post.metadata.description || `${post.metadata.title}에 대한 글입니다.`}</p>
                    <div className='flex items-center text-muted font-mono text-xs mt-auto'>
                      <Calendar className='w-4 h-4 mr-1' />
                      <span>{dateFormatter(post.metadata.publishedAt, false)}</span>
                      
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
                      <div className='w-full h-full bg-surface-2 flex items-center justify-center'>
                        <Bookmark className='w-16 h-16 text-muted' />
                      </div>
                    )}

                    {hoveredPost === post.slug && (
                      <div className='absolute inset-0 bg-accent/5 flex items-center justify-center'></div>
                    )}
                  </div>
                </div>
                
                {post.metadata.author && (
                  <div className='flex justify-between items-center p-4 border-t border-line'>
                    <div className='flex items-center'>
                      <div className='w-8 h-8 rounded-full bg-navy flex items-center justify-center text-xs font-bold text-cream'>
                        {post.metadata.author.charAt(0).toUpperCase()}
                      </div>
                      <span className='ml-2 text-muted text-sm'>{post.metadata.author}</span>
                    </div>

                    {post.metadata.views !== undefined && (
                      <div className='flex items-center text-muted font-mono text-xs'>
                        <span>{post.metadata.views} views</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
    </div>
  );
}
