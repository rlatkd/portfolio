import Link from 'next/link'
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaChevronLeft } from 'react-icons/fa';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pageRange = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(totalPages, startPage + pageRange - 1);
  
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  return (
    <div className="flex justify-center items-center mt-8 space-x-2">
      {currentPage > 1 && (
        <Link href={`?page=1`}>
          <FaAngleDoubleLeft />
        </Link>
      )}

      {currentPage > 1 && (
        <Link href={`?page=${Math.max(1, currentPage - pageRange)}`}>
          <FaAngleLeft />
        </Link>
      )}

      {pages.map(page => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`text-neutral-600 dark:text-neutral-400 ${page === currentPage ? 'font-semibold' : ''}`}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages && (
        <Link href={`?page=${Math.min(totalPages, currentPage + pageRange)}`}>
          <FaAngleRight />
        </Link>
      )}

      {currentPage < totalPages && (
        <Link href={`?page=${totalPages}`}>
          <FaAngleDoubleRight />
        </Link>
      )}
    </div>
  );
}
