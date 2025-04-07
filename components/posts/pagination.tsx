import Link from 'next/link';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

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
    <div className="flex items-center justify-center space-x-2 my-12 relative">
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="flex items-center relative z-10">
        {currentPage > 1 ? (
          <>
            <Link 
              href={`${queryPrefix}1`} 
              className="p-2 flex items-center justify-center w-10 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
              aria-label="처음 페이지로"
            >
              <ChevronsLeft className="w-5 h-5" />
            </Link>
            <Link 
              href={`${queryPrefix}${currentPage - 1}`} 
              className="p-2 flex items-center justify-center w-10 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
              aria-label="이전 페이지로"
            >
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </>
        ) : (
          <>
            <span className="p-2 flex items-center justify-center w-10 h-10 rounded-full text-white/20 cursor-not-allowed">
              <ChevronsLeft className="w-5 h-5" />
            </span>
            <span className="p-2 flex items-center justify-center w-10 h-10 rounded-full text-white/20 cursor-not-allowed">
              <ChevronLeft className="w-5 h-5" />
            </span>
          </>
        )}
      </div>
      <div className="flex items-center gap-1 mx-2">
        {pages.map((page) => (
          <Link
            key={page}
            href={`${queryPrefix}${page}`}
            className={`flex items-center justify-center w-10 h-10 rounded-full text-center transition-all ${
              page === currentPage
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md shadow-blue-500/20'
                : 'text-white/70 hover:text-white hover:bg-white/10 backdrop-blur-sm'
            }`}
            aria-label={`${page} 페이지로`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className="flex items-center">
        {currentPage < lastPage ? (
          <>
            <Link 
              href={`${queryPrefix}${currentPage + 1}`} 
              className="p-2 flex items-center justify-center w-10 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
              aria-label="다음 페이지로"
            >
              <ChevronRight className="w-5 h-5" />
            </Link>
            <Link 
              href={`${queryPrefix}${lastPage}`} 
              className="p-2 flex items-center justify-center w-10 h-10 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all backdrop-blur-sm"
              aria-label="마지막 페이지로"
            >
              <ChevronsRight className="w-5 h-5" />
            </Link>
          </>
        ) : (
          <>
            <span className="p-2 flex items-center justify-center w-10 h-10 rounded-full text-white/20 cursor-not-allowed">
              <ChevronRight className="w-5 h-5" />
            </span>
            <span className="p-2 flex items-center justify-center w-10 h-10 rounded-full text-white/20 cursor-not-allowed">
              <ChevronsRight className="w-5 h-5" />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
