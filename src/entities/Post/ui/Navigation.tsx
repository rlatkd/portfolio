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
      <div className='absolute -left-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-blue-500/10 rounded-full blur-3xl'></div>
      <div className='absolute -right-20 top-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-r from-purple-500/10 to-purple-400/20 rounded-full blur-3xl'></div>
      <div className='flex justify-between w-full relative z-10'>
        {previousPost ? (
          <Link
            href={`/posts/${previousPost.slug}`}
            className='flex items-center w-[240px] px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white group hover:bg-white/10 transition-all'
          >
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-blue-500/20 group-hover:bg-blue-500/40 transition-colors mr-4'>
              <ArrowLeft className='w-5 h-5 text-blue-400 group-hover:-translate-x-0.5 transition-transform' />
            </div>
            <div className='flex flex-col items-start overflow-hidden flex-1'>
              <span className='text-xs text-white/50 mb-1'>이전 포스트</span>
              <span className='text-sm font-semibold text-white/90 text-ellipsis overflow-hidden whitespace-nowrap w-full'>{previousPost.metadata.title}</span>
            </div>
          </Link>
        ) : (
          <div className='w-[240px]' />
        )}
        {nextPost ? (
          <Link
            href={`/posts/${nextPost.slug}`}
            className='flex items-center w-[240px] px-5 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl text-white group hover:bg-white/10 transition-all'
          >
            <div className='flex flex-col items-end overflow-hidden flex-1'>
              <span className='text-xs text-white/50 mb-1'>다음 포스트</span>
              <span className='text-sm font-semibold text-white/90 text-ellipsis overflow-hidden whitespace-nowrap w-full text-right'>{nextPost.metadata.title}</span>
            </div>
            <div className='w-10 h-10 flex items-center justify-center rounded-full bg-purple-500/20 group-hover:bg-purple-500/40 transition-colors ml-4'>
              <ArrowRight className='w-5 h-5 text-purple-400 group-hover:translate-x-0.5 transition-transform' />
            </div>
          </Link>
        ) : (
          <div className='w-[240px]' />
        )}
      </div>
    </div>
  );
}
