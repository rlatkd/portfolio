import Link from 'next/link';
import { Pane } from '@/shared/ui/pane';
import type { PostCardData } from '@/entities/post/ui/post-card';

export default function Writing({ posts }: { posts: PostCardData[] }) {
  return (
    <Pane id='posts' file='posts/' action={<Link href='/posts' className='text-muted transition-colors hover:text-accent'>더보기 ›</Link>}>
      <ul>
        {posts.map((post) => (
          <li key={post.slug} className='border-b border-line last:border-0'>
            <Link href={`/posts/${post.slug}`} className='group flex items-baseline justify-between gap-4 py-3'>
              <h3 className='font-medium leading-snug text-fg-strong transition-colors group-hover:text-accent'>{post.title}</h3>
              <span className='shrink-0 font-code text-[12px] text-muted'>{post.publishedAt.slice(0, 10)}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Pane>
  );
}
