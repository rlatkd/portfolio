import { PostCard } from './PostCard';

type PostsProps = {
  posts: any[];
};

export function Posts({ posts }: PostsProps) {
  if (posts.length === 0) {
    return (
      <p className='rounded-lg border border-line bg-surface py-16 text-center text-muted'>
        아직 작성된 글이 없습니다.
      </p>
    );
  }

  return (
    <div className='space-y-4'>
      {posts.map((post) => (
        <PostCard
          key={post.slug}
          slug={post.slug}
          title={post.metadata.title ?? ''}
          category={post.metadata.category ?? ''}
          publishedAt={post.metadata.publishedAt ?? ''}
          summary={post.metadata.summary ?? ''}
        />
      ))}
    </div>
  );
}
