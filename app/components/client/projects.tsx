import Link from 'next/link';
import { formatDate } from 'app/utils/mdx';

type ProjectsProps = {
  projects: any[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-12 mb-12">
        {projects
          .sort((a, b) => parseInt(b.metadata.index, 10) - parseInt(a.metadata.index, 10))
          .map((project) => (
            <Link
              key={project.slug}
              className="flex flex-col space-y-1 border border-neutral-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              href={`/projects/${project.metadata.index}`}
            >
              <img
                src={project.metadata.image}
                alt={project.metadata.title}
                className="w-full h-80 object-cover rounded-t-lg"
              />
              <div className="flex flex-col space-y-2">
                <p className="text-neutral-600 dark:text-neutral-400 text-sm tabular-nums">
                  {formatDate(project.metadata.publishedAt, false)}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 text-sm">
                  {project.metadata.category}
                </p>
                <p className="text-neutral-900 dark:text-neutral-100 text-lg font-semibold">
                  {project.metadata.title}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-xs ml-auto">
                  {project.slug}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
