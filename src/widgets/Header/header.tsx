'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { routing } from '@/shared/config/routing';

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <aside className='tracking-tight mb-32'>
      <div className='fixed top-0 left-0 right-0 z-50 h-16 bg-gradient-to-r from-black/90 to-gray-900/90 backdrop-blur-sm'>
        <div className='mx-auto max-w-6xl px-4'>
          <nav
            className='flex flex-row items-center justify-between relative px-0 pb-0 fade h-16'
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

            {/* Desktop Menu */}
            <div className='hidden md:flex flex-row items-center space-x-10 mr-1'>
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

            {/* Mobile Menu Button */}
            <button 
              className='md:hidden text-white p-2'
              onClick={toggleMenu}
              aria-label='메뉴 열기'
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </nav>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div 
            ref={menuRef}
            className='md:hidden absolute top-16 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-white/10 z-50'
          >
            <div className='flex flex-col py-4 px-4 space-y-4'>
              {pathname && Object.entries(routing)
                .filter(([path]) => path !== '/')
                .map(([path, { name }]) => {
                  const isActive =
                    pathname === path || (path === '/posts' && pathname.startsWith('/posts'));
                  return (
                    <Link
                      key={path}
                      href={path}
                      onClick={() => setIsOpen(false)}
                      className={`${
                        isActive 
                          ? 'bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 font-extrabold' 
                          : 'text-white opacity-80 hover:opacity-100 transition-opacity'
                      } py-2 px-2 text-lg font-semibold tracking-wide`}
                    >
                      {name}
                    </Link>
                  );
                })}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
