'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { routing } from '@/config/routing';
import { ThemeProvider } from '@/components/providers/theme-provider'

export function Header() {
  const pathname = usePathname();

  const [mounted, setMounted] = useState<boolean>(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted && pathname && 
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
                className='transition-all hover:text-neutral-200 flex items-center py-1 px-2'
              >
                <span className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 tracking-wider font-sans'>XOps</span>
              </Link>
            </div>
            <div className='flex flex-row items-center space-x-10 mr-1'>
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
                        isActive ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 font-bold' : 'text-white hover:text-blue-300'
                      } transition-all py-1 px-2 text-lg font-light tracking-wide`}
                    >
                      {name}
                    </Link>
                  );
                })}
              {/* <ThemeProvider /> */}
            </div>
          </nav>
        </div>
      </div>
    </aside>
  );
}