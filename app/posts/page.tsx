// app/page.tsx
import { getBlogPosts } from '../utils/mdx';
import PostsWrapper from '../components/client/posts-wrapper';

const POSTS_PER_PAGE = 10;

export default async function Page() {
  const allPosts = getBlogPosts();

  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-center">
        Blog Posts
      </h1>
      <PostsWrapper allPosts={allPosts} postsPerPage={POSTS_PER_PAGE} />
    </section>
  );
}
