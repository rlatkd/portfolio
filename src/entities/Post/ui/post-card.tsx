import Link from 'next/link';

export type PostCardData = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  summary: string;
  returnTo?: string;
};

/** 블로그 목록의 글 행 */
export function PostCard({ slug, title, category, publishedAt, summary, returnTo }: PostCardData) {
  return (
    <Link
      href={`/posts/${encodeURIComponent(slug)}${returnTo ? `?from=${encodeURIComponent(returnTo)}` : ''}`}
      className='group block py-7'
    >
      <div className='mb-2 flex flex-wrap items-center gap-x-3 gap-y-1'>
        {category && (
          <span className='text-xs font-medium text-accent'>
            {category}
          </span>
        )}
        {publishedAt && <span className='font-mono text-xs text-muted'>{publishedAt}</span>}
      </div>
      <h3 className='text-lg font-semibold leading-snug text-fg-strong transition-colors group-hover:text-accent'>
        <span>{title}</span>
      </h3>
      {summary && (
        <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-muted'>{summary}</p>
      )}
    </Link>
  );
}
