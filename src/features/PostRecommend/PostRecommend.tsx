import Link from 'next/link';
import { dateFormatter } from '@/shared/utils/dateFormatter';
import type { PostPreview } from '@/shared/types/post';
import { BookOpen, ArrowRight } from 'lucide-react';

export default function PostRecommend({ posts }: { posts: PostPreview[] }) {
  if (!posts.length) return null;
  return (
    <div className='w-full mx-auto mt-20 mb-16 relative'>
      <div className='relative z-10'>
        <h2 className='text-2xl font-serif mb-8 flex items-center text-fg-strong cursor-default'>
          <BookOpen className='w-5 h-5 mr-2 text-accent' />관심 있을 만한 포스트
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {posts.map(post => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className='border border-line bg-surface rounded-xl overflow-hidden hover:border-accent transition-colors group'>
              <div className='p-6 flex flex-col h-80 relative'>
                <div className='relative'>
                  <h3 className='text-lg font-serif text-fg-strong mb-2 group-hover:text-accent transition-colors'>{post.metadata.title}</h3>
                  <p className='text-muted text-sm mb-4 line-clamp-3'>{post.metadata.summary}</p>
                </div>
                <div className='mt-auto'>
                  <div className='flex items-center space-x-3 mb-3 text-muted font-mono text-xs'>
                    <time dateTime={post.metadata.publishedAt}>{dateFormatter(post.metadata.publishedAt)}</time>
                  </div>
                  <div className='pt-3 border-t border-line flex items-center justify-between'>
                    <div className='w-6 h-6 flex items-center justify-center rounded-full bg-surface-2 transition-colors'>
                      <ArrowRight className='w-3.5 h-3.5 text-accent group-hover:translate-x-0.5 transition-transform' />
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
