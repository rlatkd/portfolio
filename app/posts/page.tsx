import { Pagination } from 'app/components/pagination'
import { Posts } from 'app/components/posts'
import Rss from 'app/components/rss'

export default function Page() {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
        <Rss/>
        <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-center flex-grow">Katalog</h1>
        <h1 className='text-right'>TODO 정렬</h1>
      </div>
      <Posts />
    </section>
  )
}
