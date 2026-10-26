import Link from 'next/link';
import type { AnchorHTMLAttributes } from 'react';

export function Linker(props: AnchorHTMLAttributes<HTMLAnchorElement>) {
  let href = props.href || ''

  if (href.startsWith('/')) {
    return (
      <Link href={href} {...props}>
        {props.children}
      </Link>
    )
  }

  if (href.startsWith('#')) {
    return <a {...props} />
  }

  return <a {...props} target='_blank' rel='noopener noreferrer' />
}
