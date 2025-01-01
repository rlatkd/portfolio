"use client";

import Link from 'next/link';
import { Theme } from './theme';
import { routing } from '../routing';
import { usePathname } from 'next/navigation';

export function Header() {
  const pathname = usePathname();

  return (
    <aside className="tracking-tight mb-12">
      <div className="fixed top-0 left-0 right-0 z-50 h-16 text-black bg-white dark:text-white dark:bg-black">
        <div className="mx-auto max-w-6xl px-4">
          <nav
            className="flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative h-16"
            id="nav"
          >
            <div className="flex flex-row space-x-4">
              <Link
                href="/"
                className="transition-all hover:text-neutral-800 dark:hover:text-neutral-200 flex items-center space-x-2 py-1 px-2"
              >
                 {routing['/'].icon}
                 <span className="text-2xl font-semibold">{routing['/'].name}</span>
              </Link>
            </div>
            <div className="flex flex-row items-center space-x-10 mr-1">
              {Object.entries(routing)
                .filter(([path]) => path !== '/')
                .map(([path, { name }]) => {
                  const isActive =
                    pathname === path || (path === '/posts' && pathname.startsWith('/posts'));
                  return (
                    <Link
                      key={path}
                      href={path}
                      className={`${
                        isActive ? 'text-blue-500 font-bold' : 'hover:text-neutral-400 dark:hover:text-neutral-200'
                      } font-bold transition-all py-1 px-2 text-xl`}
                    >
                      {name}
                    </Link>
                  );
                })}
              <Theme />
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}
