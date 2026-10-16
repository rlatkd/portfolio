import Link from 'next/link';
import { listingUrl } from '@/shared/lib/post-listing';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

type PaginationProps = {
  currentPage: number;
  lastPage: number;
  category?: string;
  search?: string;
};

export default function Pagination({ currentPage, lastPage, category, search }: PaginationProps) {
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


  return (
    <div className='flex w-full min-w-0 items-center justify-start overflow-x-auto space-x-2 my-12 relative sm:justify-center' role='navigation' aria-label='글 목록 페이지'>
      <div className='flex shrink-0 items-center relative z-10'>
        {currentPage > 1 ? (
          <>
            <Link
              href={listingUrl(1, category, search)}
              className='p-2 flex items-center justify-center w-10 h-10 rounded-full text-muted hover:text-accent transition-colors'
              aria-label='처음 페이지로'
            >
              <ChevronsLeft className='w-5 h-5' />
            </Link>
            <Link
              href={listingUrl(currentPage - 1, category, search)}
              className='p-2 flex items-center justify-center w-10 h-10 rounded-full text-muted hover:text-accent transition-colors'
              aria-label='이전 페이지로'
            >
              <ChevronLeft className='w-5 h-5' />
            </Link>
          </>
        ) : (
          <>
            <span className='p-2 flex items-center justify-center w-10 h-10 rounded-full text-muted/40'>
              <ChevronsLeft className='w-5 h-5' />
            </span>
            <span className='p-2 flex items-center justify-center w-10 h-10 rounded-full text-muted/40'>
              <ChevronLeft className='w-5 h-5' />
            </span>
          </>
        )}
      </div>
      <div className='flex shrink-0 items-center gap-1 mx-2'>
        {pages.map((page) => (
          <Link
            key={page}
            href={listingUrl(page, category, search)}
            className={`flex items-center justify-center w-10 h-10 rounded-full text-center font-mono text-sm transition-colors ${
              page === currentPage
                ? 'bg-accent text-on-accent font-medium'
                : 'text-muted hover:text-accent'
            }`}
            aria-label={`${page} 페이지로`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </Link>
        ))}
      </div>
      <div className='flex shrink-0 items-center'>
        {currentPage < lastPage ? (
          <>
            <Link
              href={listingUrl(currentPage + 1, category, search)}
              className='p-2 flex items-center justify-center w-10 h-10 rounded-full text-muted hover:text-accent transition-colors'
              aria-label='다음 페이지로'
            >
              <ChevronRight className='w-5 h-5' />
            </Link>
            <Link
              href={listingUrl(lastPage, category, search)}
              className='p-2 flex items-center justify-center w-10 h-10 rounded-full text-muted hover:text-accent transition-colors'
              aria-label='마지막 페이지로'
            >
              <ChevronsRight className='w-5 h-5' />
            </Link>
          </>
        ) : (
          <>
            <span className='p-2 flex items-center justify-center w-10 h-10 rounded-full text-muted/40'>
              <ChevronRight className='w-5 h-5' />
            </span>
            <span className='p-2 flex items-center justify-center w-10 h-10 rounded-full text-muted/40'>
              <ChevronsRight className='w-5 h-5' />
            </span>
          </>
        )}
      </div>
    </div>
  );
}
