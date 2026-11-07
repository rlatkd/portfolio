import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getPosts } from '@/shared/lib/markdown';
import { getPostListing, listingUrl, type PostSearchParams } from '@/shared/lib/post-listing';
import { baseUrl } from '@/shared/config/site';
import { shareCard } from '@/shared/lib/seo';
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
  // 화면 부제와 같은 문장에, 탭 제목(posts)에 없는 이름만 앞에 붙인다.
  const description = '김상훈의 개발, 설계, 그리고 경험에 대한 기록입니다.';
  const canonical = listingUrl(listing.page, listing.category, listing.search);
  return {
    // 탭 제목은 'posts'로 고정한다. 공유 카드는 모든 링크 공통(shareCard).
    title: { absolute: 'posts' }, other: { description }, alternates: { canonical },
    robots: { index: !listing.category && !listing.search, follow: true },
    ...shareCard(`${baseUrl}${canonical}`),
  };
}
export default async function Page({ searchParams }: Props) {
  const listing = await loadListing(searchParams);
  // 하단 문구까지 간격을 글 상세(88px)와 맞춘다: 문서 아래 여백 24px + mb-16(64px)
  return (
    <section className='mb-16 w-full min-w-0'>
      <header className={styles.pageHeader}>
        <h1 className='text-fg-strong'>Posts</h1>
        <p className={styles.pageSubtitle}>개발, 설계, 그리고 경험에 대한 기록을 남깁니다.</p>
      </header>
      <div className={styles.listing}>
      <form action='/posts' className='mb-6 flex flex-wrap gap-2' role='search'>
        <label htmlFor='post-search' className='sr-only'>글 검색</label>
        <input id='post-search' name='q' type='search' maxLength={120} defaultValue={listing.search} placeholder='제목 · 요약 · 주제' className='min-w-0 flex-1 rounded border border-line bg-surface px-3 py-2' />
        {listing.category && <input type='hidden' name='category' value={listing.category} />}
        <button className='rounded-md border border-button-2-border bg-button-2 px-4 py-2 text-on-button-2 transition-colors hover:border-accent hover:text-accent'>검색</button>
      </form>
      {(listing.search || listing.category) && <a href='/posts' className='mb-4 inline-block rounded border border-line px-3 py-2 text-sm text-accent'>검색·필터 초기화</a>}
      {listing.search && <p role='status' className='mb-4 text-muted'>“{listing.search}” 검색 결과 {listing.total}개</p>}
      <div className='mb-4'><Categories categories={listing.categories} selectedCategory={listing.category || ''} search={listing.search} /></div>
      <Posts posts={listing.posts} returnTo={listingUrl(listing.page, listing.category, listing.search)} />
      <Pagination currentPage={listing.page} lastPage={listing.lastPage} category={listing.category} search={listing.search} />
      </div>
    </section>
  );
}
