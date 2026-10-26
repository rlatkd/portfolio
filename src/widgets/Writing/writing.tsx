import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section, Row } from '@/shared/ui/Section';
import type { PostCardData } from '@/entities/Post/ui/PostCard';

export default function Writing({ posts }: { posts: PostCardData[] }) {
  return (
    <Section id='writing'>
      <div className='mb-6 flex items-baseline justify-between gap-4'>
        <h2 id='writing-heading' className='text-[11px] font-bold uppercase tracking-[0.16em] text-fg-strong'>
          Writing
        </h2>
        <Link href='/posts' className='text-xs font-semibold text-muted hover:text-accent'>
          더보기
        </Link>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`} className='group block py-3'>
              <Row aside={<span className='font-mono'>{post.publishedAt.slice(0, 10)}</span>}>
                <h3 className='font-medium leading-snug text-fg-strong group-hover:text-accent'>
                  {post.title}
                  <ArrowUpRight size={14} className='ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                </h3>
              </Row>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  );
}
