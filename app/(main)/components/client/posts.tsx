import Link from 'next/link';
import { formatDate } from 'app/(with-layout)/utils/mdx';

type PostsProps = {
  posts: any[];
}
// TODO filter, sort 다시 구현
export function Posts({ posts }: PostsProps) {
  return (
    <>
      <div className="grid grid-cols-1 gap-12 mb-12">
        {posts
          .sort((a, b) => parseInt(b.metadata.index, 10) - parseInt(a.metadata.index, 10))
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 border border-neutral-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              href={`/posts/${post.metadata.index}`}
            >
              <img
                src={post.metadata.image}
                alt={post.metadata.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="flex flex-col space-y-2">
                <p className="text-neutral-600 dark:text-neutral-400 text-sm tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 text-sm">
                  {post.metadata.category}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 text-lg font-semibold">
                  {post.metadata.title}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs ml-auto">
                  {post.slug}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
