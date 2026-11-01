'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

export function ListingReturn() {
  const query = useSearchParams();
  const from = query.get('from');
  // Only allow this site's listing route, never a caller-provided external URL.
  const href = from && /^\/posts(?:\?[^#]*)?$/.test(from) ? from : '/posts';
  return <Link href={href} className='inline-flex h-[34px] items-center gap-2 text-sm text-muted hover:text-accent'>목록으로 <Menu size={16} aria-hidden='true' /></Link>;
}
