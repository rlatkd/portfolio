'use client';

import Link from 'next/link';
import { dateFormatter } from '@/utils/dateFormatter';
import { slugify } from '@/utils/slugify';

type PostsProps = {
  posts: any[];
}

export function Posts({ posts }: PostsProps) {
  return (
    <>
      <div className='grid grid-cols-1 gap-8 mb-12'>
        {posts
          .sort((a, b) => parseInt(b.metadata.index, 10) - parseInt(a.metadata.index, 10))
          .map((post) => (
            <Link
              key={post.slug}
              className='flex flex-col space-y-1 border border-blue-500/20 hover:border-blue-500/50 rounded-lg p-5 shadow-md hover:shadow-blue-500/10 transition-all duration-300'
              href={`/posts/${post.slug}`}
            >
              <img
                src={post.metadata.image}
                alt={post.metadata.title}
                className='w-full h-48 object-cover rounded-lg mb-4 border border-blue-500/10'
              />
              <div className='flex flex-col space-y-3'>
                <div className="flex justify-between items-center">
                  <p className='text-white/60 text-sm tabular-nums'>
                    {dateFormatter(post.metadata.publishedAt, false)}
                  </p>
                  <span className='text-sm px-3 py-1 rounded-full bg-blue-500/20 text-blue-400'>
                    {post.metadata.category}
                  </span>
                </div>
                <p className='text-white text-xl font-semibold tracking-wide'>
                  {post.metadata.title}
                </p>
                <p className='text-white/50 text-xs ml-auto font-light tracking-wide'>
                  {post.slug}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
