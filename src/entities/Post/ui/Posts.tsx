import type { PostPreview } from '@/shared/types/post';
import { PostCard } from './PostCard';
import Link from 'next/link';
import { getPostDescription } from '@/shared/lib/seo';

type PostsProps = {
  posts: PostPreview[];
  returnTo?: string;
};

export function Posts({ posts, returnTo }: PostsProps) {
  if (posts.length === 0) {
    return (
      <div className='rounded-lg border border-line bg-surface py-16 text-center text-muted'>
        <p>표시할 글이 없습니다. 검색어나 카테고리를 바꿔 보세요.</p>
        <Link href='/posts' className='mt-4 inline-block rounded border border-line px-4 py-2 text-accent'>전체 글 보기</Link>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          returnTo={returnTo}
          title={post.metadata.title ?? ''}
          category={post.metadata.category ?? ''}
          publishedAt={post.metadata.publishedAt ?? ''}
          summary={getPostDescription(post)}
        />
      ))}
    </div>
  );
}
