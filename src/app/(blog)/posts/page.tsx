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
    permanentRedirect(listingUrl(listing.page, listing.category));
  }
  return listing;
}
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const listing = await loadListing(searchParams);
  const title = listing.category ? `Writing · ${listing.category}` : 'Writing';
  const description = '개발, 설계, 경험에 대한 김상훈의 기술 기록입니다.';
  const canonical = listingUrl(listing.page, listing.category);
  const image = `${baseUrl}/api/og?title=${encodeURIComponent(title)}`;
  return {
    title, description, alternates: { canonical },
    robots: { index: !listing.category, follow: true },
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
      <div className='mb-8'><Categories categories={listing.categories} selectedCategory={listing.category || ''} /></div>
      <Posts posts={listing.posts} />
      <Pagination currentPage={listing.page} lastPage={listing.lastPage} category={listing.category} />
    </section>
  );
}
