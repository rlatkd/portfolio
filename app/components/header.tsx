import Link from 'next/link'
import { Theme } from './client/theme'
import { routing } from './routing';

export function Header() {
  return (
    <aside className="tracking-tight mb-14">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 text-black bg-white dark:text-white dark:bg-black">
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className=" flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative h-16"
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
          <div className="flex space-x-4 items-center">
            <Theme />
          </div>
        </nav>
        </div>
      </div>
    </aside>
  )
}
