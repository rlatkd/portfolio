import Link from 'next/link';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { getPosts } from '@/shared/lib/markdown';

type NavigationProps = {
  currentPost: number;
};

export default async function Navigation({ currentPost }: NavigationProps) {
  const posts = await getPosts();
  const previousPost = posts.find((post) => post.metadata.index === currentPost - 1)
  const nextPost = posts.find((post) => post.metadata.index === currentPost + 1)
  
  return (
    <div id='navigation' className='max-w-4xl mx-auto mt-20 mb-20 flex justify-between relative'>
      <div className='flex justify-between w-full relative z-10'>
        {previousPost ? (
          <Link
            href={`/posts/${previousPost.slug}`}
            className='flex items-center w-[45%] max-w-[240px] px-5 py-4 border border-line bg-surface rounded-xl text-fg group hover:border-accent transition-colors'
          >
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-surface-2 transition-colors mr-4'>
              <ArrowLeft className='w-5 h-5 text-accent group-hover:-translate-x-0.5 transition-transform' />
            </div>
            <div className='flex flex-col items-start overflow-hidden flex-1'>
              <span className='font-mono text-xs text-muted mb-1'>이전 포스트</span>
              <span className='text-sm font-semibold text-fg-strong text-ellipsis overflow-hidden whitespace-nowrap w-full'>{previousPost.metadata.title}</span>
            </div>
          </Link>
        ) : (
          <div className='w-[45%] max-w-[240px]' />
        )}
        {nextPost ? (
          <Link
            href={`/posts/${nextPost.slug}`}
            className='flex items-center w-[45%] max-w-[240px] px-5 py-4 border border-line bg-surface rounded-xl text-fg group hover:border-accent transition-colors'
          >
            <div className='flex flex-col items-end overflow-hidden flex-1'>
              <span className='font-mono text-xs text-muted mb-1'>다음 포스트</span>
              <span className='text-sm font-semibold text-fg-strong text-ellipsis overflow-hidden whitespace-nowrap w-full text-right'>{nextPost.metadata.title}</span>
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-surface-2 transition-colors ml-4'>
              <ArrowRight className='w-5 h-5 text-accent group-hover:translate-x-0.5 transition-transform' />
            </div>
          </Link>
        ) : (
          <div className='w-[45%] max-w-[240px]' />
        )}
      </div>
    </div>
  );
}
