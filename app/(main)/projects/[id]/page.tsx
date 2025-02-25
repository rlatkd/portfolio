import { notFound } from 'next/navigation'
import { CustomMDX } from 'app/(main)/components/custom-mdx'
import { formatDate, getPosts, getProjects } from 'app/(main)/utils/mdx'
import { FaList } from 'react-icons/fa'
import Link from 'next/link'

export default async function Page({ params }) {
  let project = getProjects().find((project) => project.metadata.index.toString() === params.id)

  if (!project) notFound()

  return (
    <section>
       <div className="flex justify-between items-center">
        <h1 className="title font-semibold text-2xl tracking-tighter">
          {project.metadata.title}
        </h1>
        <Link href="/projects" className="flex items-center text-neutral-700 dark:text-neutral-200 hover:text-white">
          <FaList />
        </Link>
      </div>
      <div className="flex justify-between items-center mt-2 mb-8 text-sm border-b border-b-gray-200">
        <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
          {formatDate(project.metadata.publishedAt)}
        </p>
        <p className="mb-8 text-sm text-neutral-600 dark:text-neutral-400 cursor-default">
          {/* {count} */}
          views
        </p>
      </div>
      <article className="prose w-4/6 mx-auto">
        <CustomMDX source={project.content} />
      </article>
    </section>
  )
}
