import type { ReactNode } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import styles from './document-layout.module.css';

export function DocumentShell({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`${styles.shell} ${className}`}>{children}</div>;
}

export function DocumentHeader({ children }: { children?: ReactNode }) {
  return <header className={styles.header}>
    <Link href='/' className='inline-flex items-center gap-2 font-code text-[13px] text-muted hover:text-accent'>
      <ChevronLeft size={15} aria-hidden='true' /> 포트폴리오
    </Link>
    {children}
  </header>;
}
