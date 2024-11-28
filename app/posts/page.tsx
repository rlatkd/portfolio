import { BlogPosts } from 'app/components/posts'

export const metadata = {
  title: 'Blog',
  description: 'Read my blog.',
}

export default function Page() {
  return (
    <section>
      <div className="flex justify-between items-center mb-8">
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter text-center flex-grow">Katalog</h1>
      <h1 className='text-right'>11</h1>
      </div>
      <BlogPosts />
    </section>
  )
}
