import Link from 'next/link';
import { ThemeToggle } from '@/features/ThemeToggle/ThemeToggle';
import { profile } from '@/shared/data/site-data';

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className='border-b border-line'>
        <div className='mx-auto flex h-16 max-w-content items-center justify-between px-5 md:px-8'>
          <Link href='/' className='font-serif text-lg text-fg-strong transition-colors hover:text-accent'>
            {profile.nameEn}
          </Link>
          <div className='flex items-center gap-5'>
            <Link
              href='/posts'
              className='font-mono text-xs uppercase tracking-label text-muted transition-colors hover:text-accent'
            >
              Archive
            </Link>
            <Link
              href='/#contact'
              className='font-mono text-xs uppercase tracking-label text-muted transition-colors hover:text-accent'
            >
              Contact
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
      {children}
    </>
  );
}
