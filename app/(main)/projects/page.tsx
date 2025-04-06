import { Projects } from '@/components/ui/projects';
import { getProjects } from '@/lib/markdown';

const POSTS_PER_PAGE = 5; // 게시글 랜더링 수

type PageProps = {
  searchParams: {
    page?: string;
  };
};

export default async function Page({ searchParams }: PageProps) {
  const sortedProjects = await getProjects();
  const totalPosts = sortedProjects.length; // 총 게시글 수
  const lastPage = Math.ceil(totalPosts / POSTS_PER_PAGE); // 마지막 페이지
  const currentPage = parseInt(searchParams.page || '1', 10); // 현재 페이지
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE; // 시작 게시글 번호(페이지당)
  const endIndex = startIndex + POSTS_PER_PAGE; // 끝 게시글 번호(페이지당)
  const currentPosts = sortedProjects.slice(startIndex, endIndex); // 현재 게시글들

  return (
    <>
      This is projects
    </>
    // <section className='mx-auto'>
    //   <Projects projects={currentPosts} />
    // </section>
  );
}
