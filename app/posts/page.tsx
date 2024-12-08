import { Posts } from 'app/components/posts'
import Rss from 'app/components/rss'
import { getBlogPosts } from './utils';
import Pagination from 'app/components/pagination';

export default async function Page({ searchParams }: { searchParams: { page?: string } }) {
  
  const POST_PER_PAGE = 10;
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;  // 쿼리파라미터 page 존재하지 않으면 default 값;1
  const allPosts = getBlogPosts();
  const totalPosts = allPosts.length;
  const lastPage = Math.ceil(totalPosts / POST_PER_PAGE);
  const startIndex = (currentPage - 1) * POST_PER_PAGE;
  const endIndex = startIndex + POST_PER_PAGE;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <Rss/>
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-center flex-grow">Katalog</h1>
          <h1 className='text-right'>TODO 정렬</h1>
        </div>
        <Posts posts={currentPosts} />
      </section>
      <Pagination currentPage={currentPage} lastPage={lastPage} />
    </>
  )
}
