import Link from 'next/link'
import { formatDate, getBlogPosts } from 'app/posts/utils'

type Post = {
  metadata: {
    index: number;
    title: string;
    category: string;
    publishedAt: string;
    summary: string;
    image?: string;
  };
  slug: string;
  content: string;
};

type PostsProps = {
  posts: Post[];
};
export function Posts({ posts  }: PostsProps) {
  return (
    <>
      <div>
        {posts
          .sort((a, b) => {
            if (
              parseInt(a.slug, 10) > parseInt(b.slug, 10)
              // new Date(a.metadata.index) > new Date(b.metadata.index)
            ) {
              return -1
            }
            return 1
          })
          .map((post) => (
            <Link
              key={post.metadata.index}
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
                <p>{post.slug}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  )
}
