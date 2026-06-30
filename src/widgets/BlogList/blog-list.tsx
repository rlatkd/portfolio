'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  summary: string;
};

export default function BlogList({ posts }: { posts: BlogPost[] }) {
  const categories = useMemo(
    () => Array.from(new Set(posts.map((p) => p.category).filter(Boolean))),
    [posts]
  );
  const [selected, setSelected] = useState<string | null>(null);
  const filtered = selected ? posts.filter((p) => p.category === selected) : posts;

  return (
    <section className='pb-10 md:pb-14'>
      {/* 카테고리 필터 */}
      <div className='mb-8 flex flex-wrap gap-2'>
        <button
          onClick={() => setSelected(null)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            selected === null
              ? 'border-accent bg-accent/10 text-accent'
              : 'border-line text-muted hover:border-accent hover:text-accent'
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setSelected(c)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              selected === c
                ? 'border-accent bg-accent/10 text-accent'
                : 'border-line text-muted hover:border-accent hover:text-accent'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className='space-y-4'>
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.slug}`}
            className='group block rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent'
          >
            <div className='mb-2 flex flex-wrap items-center gap-x-3 gap-y-1'>
              {post.category && (
                <span className='rounded-full border border-accent/30 bg-accent/5 px-2.5 py-0.5 text-xs font-medium text-accent'>
                  {post.category}
                </span>
              )}
              {post.publishedAt && (
                <span className='font-mono text-xs text-muted'>{post.publishedAt}</span>
              )}
            </div>
            <h3 className='flex items-start justify-between gap-3 font-bold text-fg-strong group-hover:text-accent'>
              <span>{post.title}</span>
              <ArrowUpRight
                size={16}
                className='mt-0.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent'
              />
            </h3>
            {post.summary && (
              <p className='mt-2 line-clamp-2 text-sm leading-relaxed text-muted'>{post.summary}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
