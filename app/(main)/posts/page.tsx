import { getPosts } from '../utils/mdx';
import { Posts } from 'app/(main)/components/client/posts';
import Pagination from 'app/(main)/components/pagination';
import Link from 'next/link';

const POSTS_PER_PAGE = 5; // 게시글 랜더링 수

type PageProps = {
  searchParams: {
    page?: string;
    category?: string;
  };
};

export default function Page({ searchParams }: PageProps) {
  // TODO index number type 수정
  const posts = getPosts().sort((a, b) => parseInt(b.metadata.index, 10) - parseInt(a.metadata.index, 10)); // 내림차순 정렬(최신글이 맨 위로)
  const categoryFilter = searchParams.category?.toLowerCase(); // 소문자 변환
  const filteredPosts = categoryFilter ? posts.filter((post) => post.metadata.category?.toLowerCase() === categoryFilter) : posts; // 카테고리 적용에 따른 posts 분기
  const totalPosts = filteredPosts.length; // 총 게시글 수
  const lastPage = Math.ceil(totalPosts / POSTS_PER_PAGE); // 마지막 페이지
  const currentPage = parseInt(searchParams.page || "1", 10); // 현재 페이지
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE; // 시작 게시글 번호(페이지당)
  const endIndex = startIndex + POSTS_PER_PAGE; // 끝 게시글 번호(페이지당)
  const currentPosts = filteredPosts.slice(startIndex, endIndex); // 현재 게시글들
  const categories = Array.from(new Set(posts.map((post) => post.metadata.category?.toLowerCase()).filter(Boolean))); // 카테고리 리스트

  return (
    <section className='w-4/6 mx-auto'>
      <div className='flex flex-wrap gap-3 mt-10 mb-10 items-center text-center'>
        <Link href="/posts" className={`border border-gray-200 rounded-3xl px-4 py-2 min-w-20 ${!searchParams.category ? 'bg-black text-white font-extrabold' : ' bg-gray-200 text-gray-500 font-semibold'}`}>
          ALL
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`?category=${category}`}
            className={`border border-gray-200 rounded-3xl px-4 py-2 min-w-20 ${searchParams.category === category ? 'bg-black text-white font-extrabold' : ' bg-gray-200 text-gray-500 font-semibold'}`}
          >
            {category}
          </Link>
        ))}
      </div>
      <Posts posts={currentPosts} />
      {totalPosts > 0 && (
        <Pagination currentPage={currentPage} lastPage={lastPage} category={searchParams.category} />
      )}
    </section>
  );
}
