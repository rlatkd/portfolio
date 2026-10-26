'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

export function ListingReturn() {
  const query = useSearchParams();
  const from = query.get('from');
  // Only allow this site's listing route, never a caller-provided external URL.
  const href = from && /^\/posts(?:\?[^#]*)?$/.test(from) ? from : '/posts';
  return <Link href={href} className='inline-flex min-h-11 items-center rounded px-3 text-sm text-muted hover:text-accent'>글 목록으로</Link>;
}
