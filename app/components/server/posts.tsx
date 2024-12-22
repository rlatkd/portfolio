import Link from 'next/link';
import { formatDate } from 'app/utils/mdx';

export function Posts({ posts }: { posts: any[] }) {

  return (
    <>
      <div>
        {posts
          .sort((a, b) => parseInt(b.metadata.index, 10) - parseInt(a.metadata.index, 10))
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-4 border-b border-neutral-300 pb-4"
              href={`/posts/${post.metadata.index}`}
            >
              <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
                <p className="text-neutral-600 dark:text-neutral-400 w-[200px] tabular-nums">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight text-sm">
                  {post.metadata.category}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 tracking-tight text-lg">
                  {post.metadata.title}
                </p>
                <p style={{marginLeft: "auto"}}>{post.slug}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
