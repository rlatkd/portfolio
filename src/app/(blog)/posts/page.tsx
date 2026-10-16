import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { getPosts } from '@/shared/lib/markdown';
import { getPostListing, listingUrl, type PostSearchParams } from '@/shared/lib/post-listing';
import { baseUrl } from '@/shared/config/site';
import { Posts } from '@/entities/Post/ui/Posts';
import Pagination from '@/entities/Post/ui/Pagination';
import Categories from '@/entities/Post/ui/Categories';

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
    <section className='mx-auto w-full min-w-0 max-w-content px-5 py-10 md:px-8 md:py-14'>
      <header className='mb-8'>
        <h1 className='font-serif text-4xl text-fg-strong md:text-5xl'>Writing</h1>
        <p className='mt-3 max-w-2xl text-base text-muted md:text-lg'>개발, 설계, 그리고 경험에 대한 기록을 남깁니다.</p>
      </header>
      <nav aria-label='추천 연재' className='mb-5 flex flex-wrap gap-4 text-sm text-accent'>
        <a href='/posts?q=Elasticsearch' className='underline'>Elasticsearch 연재</a>
        <a href='/posts?q=Docker' className='underline'>Docker 기록</a>
        <a href='/posts?q=자바' className='underline'>자바 학습 기록</a>
      </nav>
      <form action='/posts' className='mb-6 flex flex-wrap gap-2' role='search'>
        <label htmlFor='post-search' className='sr-only'>글 검색</label>
        <input id='post-search' name='q' type='search' maxLength={120} defaultValue={listing.search} placeholder='제목 · 요약 · 주제 검색' className='min-w-0 flex-1 rounded border border-line bg-surface px-3 py-2' />
        {listing.category && <input type='hidden' name='category' value={listing.category} />}
        <button className='rounded bg-accent px-4 py-2 text-on-accent'>검색</button>
      </form>
      <p className='mb-4 text-sm text-muted'>제목·요약·카테고리에서 검색합니다.</p>
      {listing.search && <p role='status' className='mb-4 text-muted'>“{listing.search}” 검색 결과 {listing.total}개</p>}
      <div className='mb-8'><Categories categories={listing.categories} selectedCategory={listing.category || ''} search={listing.search} /></div>
      <Posts posts={listing.posts} />
      <Pagination currentPage={listing.page} lastPage={listing.lastPage} category={listing.category} search={listing.search} />
    </section>
  );
}
