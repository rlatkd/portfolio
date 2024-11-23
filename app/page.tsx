import { BlogPosts } from 'app/components/posts'

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">
        김상훈
      </h1>
      <p className="mb-4">
        {`테스트1`}
      </p>
      <div className="my-8">
        {/* <BlogPosts /> */}
      </div>
    </section>
  )
}
