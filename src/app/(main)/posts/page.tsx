import { getPosts } from '@/shared/lib/markdown';
import { Posts } from '@/entities/Post/ui/Posts';
import Pagination from '@/entities/Post/ui/Pagination';
import Categories from '@/entities/Post/ui/Categories';

const POSTS_PER_PAGE = 5;

type PageProps = {
  searchParams: {
    page?: string;
    category?: string;
  };
};

export const metadata = {
  title: 'Archive',
  description: '개발, 설계, 경험에 대한 기록.',
};

export default async function Page({ searchParams }: PageProps) {
  const posts = await getPosts();
  const allPosts = posts.sort((a, b) => b.metadata.index - a.metadata.index);
  const categoryFilter = searchParams.category?.toLowerCase();
  const filteredPosts = categoryFilter
    ? allPosts.filter((post) => post.metadata.category?.toLowerCase() === categoryFilter)
    : allPosts;
  const totalPosts = filteredPosts.length;
  const lastPage = Math.ceil(totalPosts / POSTS_PER_PAGE);
  const currentPage = parseInt(searchParams.page || '1', 10);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  const categories = Array.from(
    new Set(allPosts.map((post) => post.metadata.category?.toLowerCase()).filter(Boolean))
  );

  return (
    <section className='mx-auto max-w-content px-5 py-16 md:px-8 md:py-24'>
      <header className='mb-12'>
        <div className='font-mono text-xs uppercase tracking-label text-accent'>Writing</div>
        <h1 className='mt-3 font-serif text-4xl text-fg-strong md:text-5xl'>Archive</h1>
        <p className='mt-4 max-w-2xl text-base text-muted md:text-lg'>
          개발, 설계, 그리고 경험에 대한 기록을 남깁니다.
        </p>
      </header>

      <div className='mb-10 flex flex-wrap items-center justify-center gap-3'>
        <Categories categories={categories as string[]} selectedCategory={searchParams.category as string} />
      </div>

      <Posts posts={currentPosts} />

      {totalPosts > 0 && (
        <Pagination currentPage={currentPage} lastPage={lastPage} category={searchParams.category} />
      )}
    </section>
  );
}
