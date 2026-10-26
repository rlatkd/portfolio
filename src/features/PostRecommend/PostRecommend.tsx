import Link from 'next/link';
import { dateFormatter } from '@/shared/utils/dateFormatter';
import type { PostPreview } from '@/shared/types/post';
import { BookOpen } from 'lucide-react';
import { getPostDescription } from '@/shared/lib/seo';

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
              <div className='p-5 flex flex-col gap-4 relative'>
                <div className='relative'>
                  <h3 className='text-lg font-serif text-fg-strong mb-2 group-hover:text-accent transition-colors'>{post.metadata.title}</h3>
                  <p className='text-muted text-sm line-clamp-3'>{getPostDescription(post)}</p>
                </div>
                <div className='mt-auto'>
                  <div className='flex items-center space-x-3 text-muted font-mono text-xs'>
                    <time dateTime={post.metadata.publishedAt}>{dateFormatter(post.metadata.publishedAt)}</time>
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
