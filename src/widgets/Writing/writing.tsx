import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { getPosts } from '@/shared/lib/markdown';

export default async function Writing() {
  const posts = await getPosts();
  const recent = posts.sort((a, b) => b.metadata.index - a.metadata.index).slice(0, 4);

  return (
    <Section id='writing' label='Writing'>
      <div className='mb-6 flex items-end justify-between gap-4'>
        <p className='text-sm text-muted'>개발하며 정리한 기록을 블로그에 남깁니다.</p>
        <Link
          href='/posts'
          className='shrink-0 rounded-md border border-line px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:border-accent hover:text-accent'
        >
          전체 보기
        </Link>
      </div>

      {recent.length === 0 ? (
        <p className='text-sm text-muted'>아직 작성된 글이 없습니다.</p>
      ) : (
        <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
          {recent.map((post) => (
            <Link
              key={post.slug}
              href={`/posts/${post.slug}`}
              className='group flex flex-col rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent'
            >
              {post.metadata.category && (
                <span className='text-xs uppercase tracking-[0.2em] text-accent'>
                  {post.metadata.category}
                </span>
              )}
              <h3 className='mt-2 font-bold text-fg-strong group-hover:text-accent'>
                {post.metadata.title}
                <ArrowUpRight size={15} className='ml-1 inline-block opacity-0 transition-opacity group-hover:opacity-100' />
              </h3>
              <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-muted'>
                {post.metadata.summary || ''}
              </p>
            </Link>
          ))}
        </div>
      )}
    </Section>
  );
}
