// "use client";

// import { getBlogPosts } from 'app/utils/mdx';
// import Link from 'next/link';
// import { useSearchParams } from 'next/navigation';
// import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

// type PaginationProps = {
//   lastPage: number;
// }

// export default function Pagination({ lastPage }: PaginationProps) {

//   const test = getBlogPosts();

//   const searchParams = useSearchParams();
//   const currentPage = Number(searchParams.get('page')) || 1;

//   const firstPage = 1;
//   const pageRange = 5;
//   const startPage = Math.max(1, currentPage - Math.floor(pageRange / 2));
//   const endPage = Math.min(lastPage, startPage + pageRange - 1);
//   const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

//   return (
//     <div className="flex justify-center items-center mb-5 space-x-2">
//       {currentPage > firstPage && (
//         <Link href={`?page=${firstPage}`}>
//           <FaAngleDoubleLeft />
//         </Link>
//       )}

//       {currentPage > firstPage && (
//         <Link href={`?page=${currentPage - 1}`}>
//           <FaAngleLeft />
//         </Link>
//       )}

//       {pages.map(page => (
//         <Link
//           key={page}
//           href={`?page=${page}`}
//           className={`text-dark dark:text-white ${page === currentPage ? 'text-white dark:text-black font-bold bg-black dark:bg-white' : ''}`}
//         >
//           {page}
//         </Link>
//       ))}

//       {currentPage < lastPage && (
//         <Link href={`?page=${currentPage + 1}`}>
//           <FaAngleRight />
//         </Link>
//       )}

//       {currentPage < lastPage && (
//         <Link href={`?page=${lastPage}`}>
//           <FaAngleDoubleRight />
//         </Link>
//       )}
//     </div>
//   );
// }

'use client';

import React from 'react';

export default function Pagination({
  totalPosts,
  postsPerPage,
  currentPage,
  onPageChange,
}: {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 mt-4">
      <button
        className="p-2"
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        {'<<'}
      </button>
      <button
        className="p-2"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        {'<'}
      </button>
      {pages.map((page) => (
        <button
          key={page}
          className={`p-2 ${page === currentPage ? 'font-bold' : ''}`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="p-2"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        {'>'}
      </button>
      <button
        className="p-2"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        {'>>'}
      </button>
    </div>
  );
}
