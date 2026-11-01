'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ListingReturn } from '@/features/post-recommend/listing-return';

export function BlogHeaderAction() {
  const pathname = usePathname();
  if (!pathname.startsWith('/posts/')) return null;

  return <Suspense fallback={<Link href='/posts' className='inline-flex h-[34px] items-center gap-2 text-sm text-muted hover:text-accent'>목록으로 <Menu size={16} aria-hidden='true' /></Link>}>
    <ListingReturn />
  </Suspense>;
}
