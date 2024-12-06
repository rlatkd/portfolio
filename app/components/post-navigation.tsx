import { getBlogPosts } from 'app/posts/utils'
import Link from 'next/link'
import { FaChevronCircleRight, FaChevronCircleLeft } from 'react-icons/fa'

type PostNavigationProps = {
  currentPost: number;
};

export default function PostNavigation({ currentPost }: PostNavigationProps) {
  let previousPost = getBlogPosts().find((post) => post.metadata.index === currentPost - 1)
  let nextPost = getBlogPosts().find((post) => post.metadata.index === currentPost + 1)

  return (
    <div className="flex justify-between mt-20 mb-20">
      {previousPost ? (
        <Link
          href={`/posts/${previousPost.metadata.index}`}
          className="flex items-center w-[200px] px-6 py-3 bg-gray-100 rounded-md text-center text-sm font-medium text-gray-700 hover:bg-gray-200 transition duration-300"
        >
          <FaChevronCircleLeft className="mr-4 h-6 w-6" />
          <div className="flex flex-col items-start overflow-hidden flex-1">
            <span className="text-sm ml-auto">이전 포스트</span>
            <span className="text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-full max-w-[150px] text-right">{previousPost.metadata.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}
      {nextPost ? (
        <Link
          href={`/posts/${nextPost.metadata.index}`}
          className="flex items-center w-[200px] px-6 py-3 bg-gray-100 rounded-md text-center text-sm font-medium text-gray-700 hover:bg-gray-200 transition duration-300"
        >
          <div className="flex flex-col items-start overflow-hidden flex-1">
            <span className="text-sm ">다음 포스트</span>
            <span className="text-xl font-semibold text-ellipsis overflow-hidden whitespace-nowrap w-full max-w-[150px] text-left">{nextPost.metadata.title}</span>
          </div>
          <FaChevronCircleRight className="ml-4 h-6 w-6" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
}
