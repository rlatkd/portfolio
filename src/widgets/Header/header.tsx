'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { routing } from '@/shared/config/routing';

export function Header() {
  const pathname = usePathname();

  return (
    <aside className='tracking-tight mb-32'>
      <div className='fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-black/90 to-gray-900/90 backdrop-blur-sm'>
        <div className='mx-auto max-w-6xl px-4'>
          <nav
            className='flex flex-row items-center justify-between relative px-0 pb-0 fade md:overflow-auto scroll-pr-6 md:relative h-16'
            id='nav'
          >
            <div className='flex flex-row space-x-4'>
              <Link
                href='/'
                className='transition-all hover:text-neutral-200 flex items-center'
              >
                <div className='flex items-center'>
                  <img src='/logo.svg' alt='Logo' className='h-12 w-auto -mr-1' />
                </div>
              </Link>
            </div>
            <div className='flex flex-row items-center space-x-10 mr-1'>
              {pathname && Object.entries(routing)
                .filter(([path]) => path !== '/')
                .map(([path, { name }]) => {
                  const isActive =
                    pathname === path || (path === '/posts' && pathname.startsWith('/posts'));
                  return (
                    <Link
                      key={path}
                      href={path}
                      className={`${
                        isActive 
                          ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 font-extrabold' 
                          : 'text-white opacity-80 hover:opacity-100 transition-opacity'
                      } py-1 px-2 text-lg font-semibold tracking-wide`}
                    >
                      {name}
                    </Link>
                  );
                })}
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}
