"use client";

import Link from 'next/link'
import { useRouter } from 'next/router';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight, FaChevronLeft } from 'react-icons/fa';

type PaginationProps = {
  currentPage: number;
  lastpage: number;
}

export default function Pagination({ currentPage, lastPage }: PaginationProps) {
  // const router = useRouter();
  
  const firstPage = 1;
  const pageRange = 5;
  const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
  const endPage = Math.min(lastPage, startPage + pageRange - 1);
  
  const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

  console.log(currentPage)

  return (
    <div className="flex justify-center items-center mb-5 space-x-2">
      {currentPage > firstPage && (
        <Link href={`?page=${firstPage}`}>
          <FaAngleDoubleLeft />
        </Link>
      )}

      {currentPage > firstPage && (
        <Link href={`?page=${currentPage - 1}`}>
          <FaAngleLeft />
        </Link>
      )}

      {pages.map(page => (
        <Link
          key={page}
          href={`?page=${page}`}
          className={`text-dark dark:text-white ${page === currentPage ? 'text-white dark:text-black font-bold bg-black dark:bg-white' : ''}`}
        >
          {page}
        </Link>
      ))}

      {currentPage < lastPage && (
        <Link href={`?page=${currentPage + 1}`}>
          <FaAngleRight />
        </Link>
      )}

      {currentPage < lastPage && (
        <Link href={`?page=${lastPage}`}>
          <FaAngleDoubleRight />
        </Link>
      )}
    </div>
  );
}
