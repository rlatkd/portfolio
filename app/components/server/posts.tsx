// import Link from 'next/link'
// import { formatDate, getBlogPosts } from 'app/utils/mdx'
// import Pagination from '../client/pagination';

// // type Post = {
// //   metadata: {
// //     index: number;
// //     title: string;
// //     category: string;
// //     publishedAt: string;
// //     summary: string;
// //     image?: string;
// //   };
// //   slug: string;
// //   content: string;
// // };

// // type PostsProps = {
// //   posts: Post[];
// // };

// type PostProps = {
//   currentPage: number;
// }

// export function Posts({ currentPage }: PostProps) {

//   const POST_PER_PAGE = 10; // 한 페이지당 나오는 게시물 수
//   // const currentPage = searchParams.page ? parseInt(searchParams.page, 10) : 1;  // 쿼리파라미터 page 존재하지 않으면 default 값;1
  
//   const allPosts = getBlogPosts(); // 게시물 전체
//   const totalPosts = getBlogPosts().length; // 게시물 전체 수

//   const lastPage = Math.ceil(totalPosts / POST_PER_PAGE);

  
//   const startIndex = (currentPage - 1) * POST_PER_PAGE;
//   const endIndex = startIndex + POST_PER_PAGE;


//   const currentPosts = allPosts.slice(startIndex, endIndex)

//   return (
//     <>
//       <div>
//         {allPosts
//           .sort((a, b) => {
//             if (
//               parseInt(a.slug, 10) > parseInt(b.slug, 10)
//               // new Date(a.metadata.index) > new Date(b.metadata.index)
//             ) {
//               return -1
//             }
//             return 1
//           })
//           .map((post) => (
//             <Link
//               key={post.metadata.index}
//               className="flex flex-col space-y-1 mb-4 border-b border-neutral-300 pb-4"
//               href={`/posts/${post.metadata.index}`}
//             >
//               <div className="w-full flex flex-col md:flex-row space-x-0 md:space-x-2">
//                 <p className="text-neutral-600 dark:text-neutral-400 w-[200px] tabular-nums">
//                   {formatDate(post.metadata.publishedAt, false)}
//                 </p>
//                 <p className="text-neutral-900 dark:text-neutral-100 tracking-tight text-sm">
//                   {post.metadata.category}
//                 </p>
//                 <p className="text-neutral-900 dark:text-neutral-100 tracking-tight text-lg">
//                   {post.metadata.title}
//                 </p>
//                 <p>{post.slug}</p>
//               </div>
//             </Link>
//           ))}
//       </div>
//       <Pagination lastPage={lastPage}/>
//     </>
//   )
// }

// app/components/server/posts.tsx
import React from 'react';

export function Posts({ posts }: { posts: Array<{ metadata: any; slug: string }> }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map(({ metadata, slug }) => (  
        <article key={slug} className="p-4 border rounded-md">
          <h2 className="text-xl font-semibold">{slug}</h2>
         
        </article>
      ))}
    </div>
  );
}
