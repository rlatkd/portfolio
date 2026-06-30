'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Github, Linkedin, Mail, Phone, MapPin, Rss } from 'lucide-react';
import { profile, navItems } from '@/shared/data/site-data';
import { ThemeToggle } from '@/features/ThemeToggle/ThemeToggle';
import { useView } from '@/shared/ui/view-context';

type RecentPost = { slug: string; title: string; category: string; publishedAt: string };

/** Velog 마크 — github/linkedin과 동일한 아웃라인(stroke) 스타일 */
function VelogIcon({ size = 19 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth={2}
      strokeLinecap='round'
      strokeLinejoin='round'
      aria-hidden='true'
    >
      <rect x='3' y='3' width='18' height='18' rx='5' />
      <path d='M8 8.5l3 7 3-7' />
    </svg>
  );
}

export default function Sidebar({ recent = [] }: { recent?: RecentPost[] }) {
  const [active, setActive] = useState('about');
  const { view, setView } = useView();

  useEffect(() => {
    if (view !== 'portfolio') return;
    const sections = navItems
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));

    // 페이지 최하단 도달 시 마지막 섹션(Contact)을 강제로 활성화
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (nearBottom) setActive(navItems[navItems.length - 1].id);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
    };
  }, [view]);

  // blog 뷰에서 nav 클릭 시 → portfolio로 전환 후 해당 섹션으로 스크롤
  const onNavClick = (e: React.MouseEvent, id: string) => {
    if (view !== 'portfolio') {
      e.preventDefault();
      setView('portfolio');
      setActive(id);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 60);
    }
  };

  const socials = [
    { Icon: Github, href: profile.github, label: 'GitHub' },
    { Icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
    { Icon: VelogIcon, href: profile.velog, label: 'Velog' },
    { Icon: Rss, href: '/rss', label: 'RSS' },
  ];

  return (
    <header className='pb-10 pt-16 lg:sticky lg:top-0 lg:flex lg:h-screen lg:max-h-screen lg:w-[42%] lg:flex-col lg:justify-between lg:py-24'>
      <div>
        <p className='text-xs font-semibold uppercase tracking-[0.25em] text-accent'>{profile.role}</p>
        <h1 className='mt-3 text-5xl font-bold tracking-tight text-fg-strong lg:text-6xl'>
          {profile.name}
        </h1>
        <p className='mt-2 text-xl italic text-muted'>{profile.nameEn}</p>
        <p className='mt-5 max-w-xs leading-relaxed text-muted'>{profile.intro}</p>

        {/* 목차 (데스크톱) */}
        <nav className='mt-12 hidden lg:block'>
          <p className='font-mono text-xs uppercase tracking-[0.2em] text-muted'>Contents</p>
          <ul className='mt-4 space-y-1'>
            {navItems.map((item) => {
              const on = view === 'portfolio' && active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={(e) => onNavClick(e, item.id)}
                    className='group flex items-center py-2'
                  >
                    <span
                      className={`mr-4 h-px transition-all ${
                        on ? 'w-14 bg-accent' : 'w-8 bg-muted group-hover:w-14 group-hover:bg-fg'
                      }`}
                    />
                    <span
                      className={`text-xs font-semibold uppercase tracking-[0.2em] transition-colors ${
                        on ? 'text-accent' : 'text-muted group-hover:text-fg'
                      }`}
                    >
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* 최근 글 (데스크톱, 미니멀) */}
        {recent.length > 0 && (
          <div className='mt-12 hidden lg:block'>
            <p className='font-mono text-xs uppercase tracking-[0.2em] text-muted'>Writing</p>
            <ul className='mt-4 space-y-3'>
              {recent.map((p) => (
                <li key={p.slug}>
                  <Link href={`/posts/${p.slug}`} className='group block'>
                    <span className='block truncate text-sm text-fg transition-colors group-hover:text-accent'>
                      {p.title}
                    </span>
                    <span className='mt-0.5 block font-mono text-[11px] text-muted'>
                      {p.publishedAt}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* 하단: 연락처 · 소셜 */}
      <div className='mt-12 lg:mt-0'>
        <div className='space-y-2'>
          <a
            href={`mailto:${profile.email}`}
            className='flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent'
          >
            <Mail size={15} />
            {profile.email}
          </a>
          <a
            href={`tel:${profile.mobile.replace(/\s/g, '')}`}
            className='flex items-center gap-3 text-sm text-muted transition-colors hover:text-accent'
          >
            <Phone size={15} />
            {profile.mobile}
          </a>
          <div className='flex items-center gap-3 text-sm text-muted'>
            <MapPin size={15} />
            {profile.location}
          </div>
        </div>

        <div className='mt-6 flex items-center gap-5'>
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel='noopener noreferrer'
              aria-label={label}
              className='text-muted transition-colors hover:text-accent'
            >
              <Icon size={19} />
            </a>
          ))}
          <span className='ml-auto'>
            <ThemeToggle />
          </span>
        </div>
      </div>
    </header>
  );
}
