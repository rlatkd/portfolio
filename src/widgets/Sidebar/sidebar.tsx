'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Phone, MapPin, Rss } from 'lucide-react';
import { profile, navItems } from '@/shared/data/site-data';
import { ThemeToggle } from '@/features/ThemeToggle/ThemeToggle';

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

export default function Sidebar() {
  const [active, setActive] = useState('about');

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    if (ids.length === 0) return;

    const updateActive = () => {
      // 페이지 최하단 도달 시 마지막 섹션(Contact)을 강제로 활성화
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        setActive(ids[ids.length - 1]);
        return;
      }
      // 뷰포트 35% 기준선을 지난 '마지막' 섹션을 활성화.
      // 섹션 높이·경계와 무관하게 항상 정확히 하나만 선택되어 흔들리지 않는다.
      const line = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };

    // 스크롤은 rAF로 스로틀
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    updateActive(); // 초기 1회

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
        <p className='mt-5 max-w-xs whitespace-pre-line leading-relaxed text-muted'>{profile.intro}</p>

        {/* 목차 (데스크톱) */}
        <nav className='mt-12 hidden lg:block'>
          <p className='font-mono text-xs uppercase tracking-[0.2em] text-muted'>Contents</p>
          <ul className='mt-4 space-y-1'>
            {navItems.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <a href={`/#${item.id}`} className='group flex items-center py-2'>
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
