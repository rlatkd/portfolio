'use client';

import React, { useState } from 'react';
import Pagination from './pagination';
import { Posts } from '../server/posts';

export default function PostsWrapper({
  allPosts,
  postsPerPage,
}: {
  allPosts: Array<{ metadata: any; slug: string }>;
  postsPerPage: number;
}) {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPosts = allPosts.length;
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = allPosts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <Posts posts={currentPosts} />
      <Pagination
        totalPosts={totalPosts}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
