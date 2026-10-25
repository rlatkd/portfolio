'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowDown, Home } from 'lucide-react';
import { ThemeToggle } from '@/features/ThemeToggle/ThemeToggle';

type MenuLink = { href: string; label: string };

const tab = 'rounded-full px-3 py-2 transition-colors hover:text-gold-light md:px-4';
const active = 'bg-navy-mid text-gold-light dark:bg-surface';

function Dropdown({ label, items, basePath, open, onToggle }: { label: string; items: MenuLink[]; basePath: string; open: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const current = pathname.startsWith(basePath);
  return (
    <div className='relative'>
      <button
        type='button'
        aria-expanded={open}
        aria-haspopup='menu'
        onClick={onToggle}
        className={`${tab} inline-flex items-center gap-1 ${current || open ? active : ''}`}
      >
        {label} <ArrowDown size={14} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <ul role='menu' className='absolute right-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-line bg-surface py-2 text-fg shadow-xl md:left-1/2 md:right-auto md:-translate-x-1/2'>
          {items.map((c) => (
            <li key={c.href} role='none'>
              <Link
                role='menuitem'
                href={c.href}
                className={`block px-5 py-3 text-sm hover:bg-surface-2 hover:text-accent ${pathname === c.href ? 'font-semibold text-accent' : ''}`}
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function DemoNav({ cases, projects, role, name }: { cases: MenuLink[]; projects: MenuLink[]; role: string; name: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState<'case' | 'project' | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // 페이지 이동 시 드롭다운 닫기
  useEffect(() => setOpen(null), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('click', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <header className='fixed inset-x-0 top-4 z-40 flex items-center justify-between px-4 md:px-10'>
      <span className='hidden text-sm italic text-muted md:block' style={{ fontFamily: "'Iowan Old Style', 'Palatino Linotype', Georgia, serif" }}>
        {role}
      </span>
      <nav
        ref={navRef}
        aria-label='데모 메뉴'
        className='mx-auto flex items-center gap-0.5 rounded-full bg-navy p-1 text-sm text-cream shadow-lg ring-1 ring-gold/40 dark:bg-surface-2 md:mx-0'
      >
        <Link href='/demo' aria-label='홈' className={`${tab} ${pathname === '/demo' ? active : ''}`}>
          <Home size={16} />
        </Link>
        <Link href='/demo/profile' className={`${tab} ${pathname === '/demo/profile' ? active : ''}`}>
          Profile
        </Link>
        <Dropdown label='Case Study' items={cases} basePath='/demo/case' open={open === 'case'} onToggle={() => setOpen((v) => (v === 'case' ? null : 'case'))} />
        <Dropdown label='Projects' items={projects} basePath='/demo/projects' open={open === 'project'} onToggle={() => setOpen((v) => (v === 'project' ? null : 'project'))} />
      </nav>
      <div className='hidden items-center gap-3 rounded-full bg-bg/90 py-1 pl-4 pr-1 md:flex'>
        <span className='text-sm font-semibold text-fg-strong'>{name}</span>
        <ThemeToggle />
      </div>
    </header>
  );
}
