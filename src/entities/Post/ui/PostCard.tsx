import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type PostCardData = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  summary: string;
};

/** 홈 Writing 섹션 · 블로그 아카이브 공용 포스트 카드 */
export function PostCard({ slug, title, category, publishedAt, summary }: PostCardData) {
  return (
    <Link
      href={`/posts/${slug}`}
      className='group block rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent'
    >
      <div className='mb-2 flex flex-wrap items-center gap-x-3 gap-y-1'>
        {category && (
          <span className='rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-xs font-medium text-accent'>
            {category}
          </span>
        )}
        {publishedAt && <span className='font-mono text-xs text-muted'>{publishedAt}</span>}
      </div>
      <h3 className='flex items-start justify-between gap-3 font-bold text-fg-strong group-hover:text-accent'>
        <span>{title}</span>
        <ArrowUpRight
          size={16}
          className='mt-0.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent'
        />
      </h3>
      {summary && (
        <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-muted'>{summary}</p>
      )}
    </Link>
  );
}
