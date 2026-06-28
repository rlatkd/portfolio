'use client';

import { useEffect, useState } from 'react';
import { Github, Linkedin, PenLine, Mail, Phone, MapPin, FileText } from 'lucide-react';
import { profile, navItems } from '@/shared/data/site-data';
import { ThemeToggle } from '@/features/ThemeToggle/ThemeToggle';

export default function Sidebar() {
  const [active, setActive] = useState('about');

  useEffect(() => {
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
    return () => observer.disconnect();
  }, []);

  const socials = [
    { Icon: Github, href: profile.github, label: 'GitHub' },
    { Icon: Linkedin, href: profile.linkedin, label: 'LinkedIn' },
    { Icon: PenLine, href: profile.velog, label: 'Velog' },
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

        {/* 세로 nav (데스크톱) */}
        <nav className='mt-16 hidden lg:block'>
          <ul className='space-y-1'>
            {navItems.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <a href={`#${item.id}`} className='group flex items-center py-2'>
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

      {/* 하단: 연락처 · 버튼 · 소셜 */}
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

        <a
          href='#contact'
          className='mt-5 inline-flex items-center gap-2 rounded-md border border-accent/50 px-4 py-2.5 text-sm font-medium text-accent transition-colors hover:bg-accent/10'
        >
          <FileText size={15} />
          연락하기 / 문의
        </a>

        <div className='mt-6 flex items-center gap-5'>
          {socials.map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target='_blank'
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
