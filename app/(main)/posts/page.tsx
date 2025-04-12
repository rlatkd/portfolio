import { getPosts } from '@/lib/markdown';
import { Posts } from '@/components/ui/posts';
import Pagination from '@/components/posts/pagination';
import Categories from '@/components/posts/categories';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const POSTS_PER_PAGE = 5; // 게시글 랜더링 수

type PageProps = {
  searchParams: {
    page?: string;
    category?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const posts = await getPosts();
  // 내림차순 정렬(최신글이 맨 위로)
  const allPosts = posts.sort((a, b) => b.metadata.index - a.metadata.index); 
  const categoryFilter = searchParams.category?.toLowerCase(); // 소문자 변환
  // 카테고리 적용에 따른 posts 분기
  const filteredPosts = categoryFilter 
    ? allPosts.filter((post) => post.metadata.category?.toLowerCase() === categoryFilter) 
    : posts; 
  const totalPosts = filteredPosts.length; // 총 게시글 수
  const lastPage = Math.ceil(totalPosts / POSTS_PER_PAGE); // 마지막 페이지
  const currentPage = parseInt(searchParams.page || '1', 10); // 현재 페이지
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE; // 시작 게시글 번호(페이지당)
  const endIndex = startIndex + POSTS_PER_PAGE; // 끝 게시글 번호(페이지당)
  const currentPosts = filteredPosts.slice(startIndex, endIndex); // 현재 게시글들
  
  // 카테고리 리스트
  const categories = Array.from(
    new Set(allPosts.map((post) => post.metadata.category?.toLowerCase()).filter(Boolean))
  ); 

  return (
    <section>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-16 relative'>
          <div className='absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl'></div>
          <div className='relative z-10'>
            <h1 className='text-4xl md:text-5xl font-bold mb-6 text-white/90 cursor-default'>
              Archive
            </h1>
            <p className='text-white/70 text-xl mb-8 max-w-3xl cursor-default'>
              개발, 디자인, 그리고 경험에 대한 이야기를 나눕니다.
            </p>
          </div>
        </div>
        
        <div className='flex flex-wrap gap-3 mt-6 mb-10 items-center justify-center'>
          <Categories categories={categories as string[]} selectedCategory={searchParams.category as string} />
        </div>
        
        <Posts posts={currentPosts} />
        
        {totalPosts > 0 && (
          <Pagination currentPage={currentPage} lastPage={lastPage} category={searchParams.category} />
        )}
        
        <div className='mt-16 relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 rounded-2xl overflow-hidden'>
          <div className='absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl'></div>
          <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl'></div>
          <div className='relative z-10'>
            <h2 className='text-2xl md:text-3xl font-bold mb-4 text-white/90 cursor-default'>문의사항이 있으신가요?</h2>
            <p className='text-white/70 mb-6 max-w-2xl cursor-default'>
              콘텐츠나 협업에 관한 질문이 있으시면 언제든지 연락해 주세요.
            </p>
            <Link href='/contact' className='px-6 py-3 bg-white/90 text-black rounded-lg font-medium inline-flex items-center hover:bg-white transition-all'>
              연락하기 <ArrowRight className='ml-2 w-4 h-4' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
