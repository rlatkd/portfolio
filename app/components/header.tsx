import Link from 'next/link'
import { Theme } from './client/theme'
import { FaGithub } from 'react-icons/fa'
import { routing } from './routing';
import { Top } from './top';

export function Header() {
  return (
    <aside className="tracking-tight">
      <div className="lg:sticky lg:top-20">
        <nav
          className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative mb-8"
          id="nav"
        >
          <div className="flex flex-row space-x-20 pr-10">
            {Object.entries(routing).map(([path, { name, icon }]) => {
              return (
                <Link
                  key={path}
                  href={path}
                  className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex align-middle relative py-1 px-2 m-1"
                >
                  {path === '/' ? icon : name}
                </Link>
              )
            })}
          </div>
          <div className="ml-auto flex space-x-4 items-center">
            <Theme />
          </div>
        </nav>
        <Top />
      </div>
    </aside>
  )
}
