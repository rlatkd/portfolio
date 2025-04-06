import Link from 'next/link';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  category?: string;
};

export default function Pagination({ currentPage, lastPage, category }: PaginationProps) {
  const pageRange = 5; // 페이지버튼 갯수
  const centerPage = Math.floor(pageRange / 2); // 중앙 페이지
  let startPage = Math.max(currentPage - centerPage, 1); // 시작 페이지
  let endPage = Math.min(currentPage + centerPage, lastPage); // 끝 페이지

  if (endPage - startPage + 1 < pageRange) {
    if (startPage === 1) {
      endPage = Math.min(startPage + pageRange - 1, lastPage);
    } else if (endPage === lastPage) {
      startPage = Math.max(endPage - pageRange + 1, 1);
    }
  }

  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  const queryPrefix = category ? `?category=${category}&page=` : '?page=';

  return (
    <div className="flex items-center justify-center space-x-2 mb-10">
      <div className="flex items-center">
        {currentPage > 1 ? (
          <>
            <Link href={`${queryPrefix}1`} className="p-2 text-lg text-white/70 hover:text-blue-400 transition-colors">
              <FaAngleDoubleLeft />
            </Link>
            <Link href={`${queryPrefix}${currentPage - 1}`} className="p-2 text-lg text-white/70 hover:text-blue-400 transition-colors">
              <FaAngleLeft />
            </Link>
          </>
        ) : (
          <div style={{ width: '68px' }} />
        )}
      </div>
      <div className="flex items-center mx-auto">
        {pages.map((page) => (
          <Link
            key={page}
            href={`${queryPrefix}${page}`}
            className={`p-2 min-w-10 text-center text-lg rounded-md transition-all ${
              page === currentPage
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold'
                : 'text-white/70 hover:text-blue-400'
            }`}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        {currentPage < lastPage ? (
          <>
            <Link href={`${queryPrefix}${currentPage + 1}`} className="p-2 text-lg text-white/70 hover:text-blue-400 transition-colors">
              <FaAngleRight />
            </Link>
            <Link href={`${queryPrefix}${lastPage}`} className="p-2 text-lg text-white/70 hover:text-blue-400 transition-colors">
              <FaAngleDoubleRight />
            </Link>
          </>
        ) : (
          <div style={{ width: '68px' }} />
        )}
      </div>
    </div>
  );
}
