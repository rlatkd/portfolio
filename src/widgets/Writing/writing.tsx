import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { PostCard, type PostCardData } from '@/entities/Post/ui/PostCard';

export default function Writing({ posts }: { posts: PostCardData[] }) {
  return (
    <Section id='writing'>
      {/* 섹션 헤더 — 라벨 + 우측 전체보기 버튼 */}
      <div className='mb-6 flex items-center justify-between gap-4'>
        <h2 className='font-mono text-xs uppercase tracking-label text-accent'>Writing</h2>
        <Link
          href='/posts'
          className='group inline-flex shrink-0 items-center gap-1.5 font-mono text-xs uppercase tracking-label text-muted transition-colors hover:text-accent'
        >
          전체 글 보기
          <ArrowRight size={13} className='transition-transform group-hover:translate-x-0.5' />
        </Link>
      </div>

      <div className='space-y-4'>
        {posts.map((post) => (
          <PostCard key={post.slug} {...post} />
        ))}
      </div>
    </Section>
  );
}
