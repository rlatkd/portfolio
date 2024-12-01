import { BlogPosts } from 'app/components/posts'
import Rss from 'app/components/rss'

export default function Page() {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <Rss/>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-center flex-grow">Katalog</h1>
        <h1 className='text-right'>TODO 정렬</h1>
      </div>
      <BlogPosts />
      <div>TODO Pagination Footer 필요</div>
    </section>
  )
}

// export const metadata = {
//   title: 'Blog',
//   description: 'Read my blog.',
// }
