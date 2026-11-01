'use client';

import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/features/theme-toggle/theme-toggle';
import ScrollToTop from './scroll-to-top';

export function FloatingControls() {
  const pathname = usePathname();
  const showScroll = pathname === '/' || pathname === '/posts' || pathname.startsWith('/posts/');

  return <div className='fixed bottom-6 right-6 z-40 flex flex-col items-center gap-3 print:hidden'>
    {showScroll && <ScrollToTop embedded />}
    <ThemeToggle floating />
  </div>;
}
