import Link from 'next/link';

type ProjectsProps = {
  projects: any[];
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <div className='grid grid-cols-2 gap-12 mb-12'>
        {projects
          .sort((a, b) => parseInt(b.metadata.index, 10) - parseInt(a.metadata.index, 10))
          .map((project) => (
            <Link
              key={project.slug}
              className='flex flex-col space-y-1 border border-neutral-300 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow'
              href={`/projects/${project.metadata.index}`}
            >
              <img
                src={project.metadata.image}
                alt={project.metadata.title}
                className='w-full h-80 object-contain rounded-t-lg'
              />
              <div className='flex flex-col'>
                <ul className='list-disc pl-5'>
                  <li>{project.metadata?.description1}</li>
                  <li>{project.metadata?.description2}</li>
                  <li>{project.metadata?.description3}</li>
                  <li>{project.metadata?.description4}</li>
                </ul>
                
              </div>
                <div style={{backgroundColor: '#F9C51D33',
                              border: '1px solid #f9c51d',
                              borderRadius: '0.5rem',
                              padding: '0.75rem',
                              fontSize: '0.875rem',
                              fontWeight: '500'}}>
                  <p>{project.metadata.stack}</p>
                </div>
            </Link>
          ))}
      </div>
    </>
  );
}
