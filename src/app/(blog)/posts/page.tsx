import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getPosts } from '@/shared/lib/markdown';
import { getPostListing, listingUrl, type PostSearchParams } from '@/shared/lib/post-listing';
import { baseUrl } from '@/shared/config/site';
import { Posts } from '@/entities/post/ui/posts';
import Pagination from '@/entities/post/ui/pagination';
import Categories from '@/entities/post/ui/categories';
import styles from '../blog-document.module.css';

type Props = { searchParams: Promise<PostSearchParams> };
async function loadListing(searchParams: Props['searchParams']) {
  const query = await searchParams;
  const listing = getPostListing(await getPosts(), query);
  if (!listing) notFound();
  if (query.page === '1' || (typeof query.category === 'string' && query.category !== listing.category)) {
    permanentRedirect(listingUrl(listing.page, listing.category, listing.search));
  }
  return listing;
}
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const listing = await loadListing(searchParams);
  const title = listing.category ? `Writing · ${listing.category}` : 'Writing';
  const description = '개발, 설계, 경험에 대한 김상훈의 기술 기록입니다.';
  const canonical = listingUrl(listing.page, listing.category, listing.search);
  const image = `${baseUrl}/api/og?title=${encodeURIComponent(title)}`;
  return {
    title, description, alternates: { canonical },
    robots: { index: !listing.category && !listing.search, follow: true },
    openGraph: { title, description, url: `${baseUrl}${canonical}`, type: 'website', images: [{ url: image }], siteName: '김상훈', locale: 'ko_KR' },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
export default async function Page({ searchParams }: Props) {
  const listing = await loadListing(searchParams);
  return (
    <section className='w-full min-w-0'>
      <header className={styles.pageHeader}>
        <h1 className='text-fg-strong'>Writing</h1>
        <p className={styles.pageSubtitle}>개발, 설계, 그리고 경험에 대한 기록을 남깁니다.</p>
      </header>
      <div className={styles.listing}>
      <form action='/posts' className='mb-6 flex flex-wrap gap-2' role='search'>
        <label htmlFor='post-search' className='sr-only'>글 검색</label>
        <input id='post-search' name='q' type='search' maxLength={120} defaultValue={listing.search} placeholder='제목 · 요약 · 주제' className='min-w-0 flex-1 rounded border border-line bg-surface px-3 py-2' />
        {listing.category && <input type='hidden' name='category' value={listing.category} />}
        <button className='rounded bg-accent px-4 py-2 text-on-accent'>검색</button>
      </form>
      <p className='mb-4 text-xs text-muted'>제목·요약·카테고리에서 검색합니다. 본문 전체 검색은 제공하지 않습니다.</p>
      {(listing.search || listing.category) && <a href='/posts' className='mb-4 inline-block rounded border border-line px-3 py-2 text-sm text-accent'>검색·필터 초기화</a>}
      {listing.search && <p role='status' className='mb-4 text-muted'>“{listing.search}” 검색 결과 {listing.total}개</p>}
      <div className='mb-8'><Categories categories={listing.categories} selectedCategory={listing.category || ''} search={listing.search} /></div>
      <Posts posts={listing.posts} returnTo={listingUrl(listing.page, listing.category, listing.search)} />
      <Pagination currentPage={listing.page} lastPage={listing.lastPage} category={listing.category} search={listing.search} />
      </div>
    </section>
  );
}
