'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import { FileText, Mail, Rss } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { profile, navItems } from '@/shared/data/site-data';

function sectionScrollTop(section: HTMLElement) {
  const margin = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
  const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
  const maximum = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
  return Math.min(maximum, Math.max(0, window.scrollY + section.getBoundingClientRect().top - margin - padding));
}

export default function Sidebar() {
  const [active, setActive] = useState('about');
  const navigationTarget = useRef<{ id: string; top: number; arrived: boolean } | null>(null);

  const navigateToSection = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const section = document.getElementById(id);
    if (!section) return;

    event.preventDefault();
    const top = sectionScrollTop(section);
    navigationTarget.current = { id, top, arrived: Math.abs(window.scrollY - top) <= 2 };
    setActive(id);
    if (window.location.hash !== `#${id}`) {
      window.history.pushState(null, '', `#${id}`);
    }
    // Scroll the document explicitly, independently of the sticky sidebar's scroll container.
    window.scrollTo({
      top,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  };

  useEffect(() => {
    const ids = navItems.map((n) => n.id);
    if (ids.length === 0) return;

    const updateActive = () => {
      const target = navigationTarget.current;
      if (target) {
        const arrived = Math.abs(window.scrollY - target.top) <= 2;
        if (!target.arrived || arrived) {
          target.arrived = arrived;
          setActive(target.id);
          return;
        }
        navigationTarget.current = null;
      }
      // 페이지 최상단에서는 첫 섹션을 활성화 (화면이 높아 다음 섹션이 기준선 위에 있어도)
      if (window.scrollY <= 2) {
        setActive(ids[0]);
        return;
      }
      // 페이지 최하단 도달 시 마지막 섹션을 강제로 활성화
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

    const releaseNavigation = () => {
      navigationTarget.current = null;
      updateActive();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) releaseNavigation();
    };
    const onHashChange = () => {
      const id = window.location.hash.slice(1);
      const section = ids.includes(id) ? document.getElementById(id) : null;
      navigationTarget.current = section ? { id, top: sectionScrollTop(section), arrived: false } : null;
      updateActive();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('wheel', releaseNavigation, { passive: true });
    window.addEventListener('touchstart', releaseNavigation, { passive: true });
    window.addEventListener('pointerdown', releaseNavigation, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('hashchange', onHashChange);
    onHashChange();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('wheel', releaseNavigation);
      window.removeEventListener('touchstart', releaseNavigation);
      window.removeEventListener('pointerdown', releaseNavigation);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('hashchange', onHashChange);
    };
  }, []);

  // 2026-11-01: Velog는 하단 링크에서 뺐다(글은 Writing에서 연결).
  const socials = [
    { Icon: FiGithub, href: profile.github, label: 'GitHub' },
    { Icon: FiLinkedin, href: profile.linkedin, label: 'LinkedIn' },
    { Icon: Mail, href: `mailto:${profile.email}`, label: '이메일' },
    { Icon: Rss, href: '/rss', label: 'RSS' },
  ];

  return (
    <header className='portfolio-sidebar pt-14 lg:sticky lg:top-0 lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:overflow-y-auto lg:pb-[83px] lg:pt-20'>
      <div>
        <p className='font-code text-[13px] text-accent'>◉ portfolio</p>
        <h1 className='mt-3 text-[40px] font-bold leading-tight tracking-tight text-fg-strong'>
          <a href='/'>{profile.name}</a>
        </h1>
        <p className='mt-1 font-code text-lg text-fg'>{profile.role}</p>
        <p className='mt-5 max-w-sm whitespace-pre-line leading-7 text-fg'>{profile.intro}</p>

        {/* 이력서 — 별도 페이지 */}
        <a
          href='/resume'
          className='mt-6 inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 font-code text-[13px] text-fg-strong transition-colors hover:border-accent hover:text-accent'
        >
          <FileText size={14} aria-hidden='true' />
          이력서
        </a>

        {/* 목차 (데스크톱) — 탐색기의 파일 목록 */}
        <nav aria-label='포트폴리오 목차' className='mt-10 hidden font-code text-[14px] lg:block'>
          <p className='mb-2 text-[12px] text-muted'>▾ portfolio</p>
          <ul className='w-max min-w-56'>
            {navItems.map((item) => {
              const on = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    onClick={event => navigateToSection(event, item.id)}
                    aria-current={on ? 'location' : undefined}
                    className={`block rounded px-3 py-1.5 transition-colors ${on ? 'bg-nav-active text-fg-strong' : 'text-fg hover:text-accent'}`}
                  >
                    <span aria-hidden='true' className='whitespace-pre text-muted'>{item.file.endsWith('/') ? '▸ ' : '  '}</span>{item.file}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* 하단: 링크. 아래 여백 83px + 아이콘 칸 여백 약 13px = 화면 아래 96px로, 맨 아래로 스크롤했을 때 본문 하단 문구 아래 끝과 맞는다.
          (메인 page.tsx 하단 문구 여백과 짝. 화면이 높아도 어긋나지 않도록 사이드바 최대 높이 제한은 없앴다) */}
      <div className='mt-8 flex flex-wrap items-center gap-2 sm:gap-5 lg:mt-0'>
        {socials.map(({ Icon, href, label }) => (
          <a
            key={label}
            href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel='noopener noreferrer'
            aria-label={label}
            className='inline-flex min-h-11 min-w-8 items-center justify-center text-muted transition-colors hover:text-accent'
          >
            <Icon size={19} />
          </a>
        ))}
      </div>
    </header>
  );
}
