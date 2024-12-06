import { Posts } from 'app/components/posts'
import Rss from 'app/components/rss'
import { getBlogPosts } from './utils';
import Pagination from 'app/components/pagination';

export default function Page({ searchParams }: { searchParams: { page?: string } }) {
  const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1; // 쿼리파라미터 page 존재하지 않으면 default 값;1
  const POST_PER_PAGE = 10;
  const totalPosts = getBlogPosts().length;
  const totalPages = Math.ceil(totalPosts / POST_PER_PAGE);

  return (
    <>
      <section>
        <div className="flex justify-between items-center">
          <Rss/>
          <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-center flex-grow">Katalog</h1>
          <h1 className='text-right'>TODO 정렬</h1>
        </div>
        <Posts currentPage={currentPage} />
      </section>
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </>
  )
}
