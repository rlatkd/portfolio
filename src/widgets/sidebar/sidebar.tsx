'use client';

import { FileText, Mail, Rss } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { profile, navItems } from '@/shared/data/site-data';
import { useSectionNavigation } from './section-navigation';

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

// 현재 위치 추적 · 목차 이동은 모바일 목차 버튼과 함께 쓰는 section-navigation.ts에 있다.
const sectionIds = navItems.map((n) => n.id);

export default function Sidebar() {
  const { active, navigate } = useSectionNavigation(sectionIds);

  // Velog는 블로그 글의 원래 출처다(구조화 데이터 sameAs와 맞춤).
  const socials = [
    { Icon: FiGithub, href: profile.github, label: 'GitHub' },
    { Icon: FiLinkedin, href: profile.linkedin, label: 'LinkedIn' },
    { Icon: VelogIcon, href: profile.velog, label: 'Velog' },
    { Icon: Mail, href: `mailto:${profile.email}`, label: '이메일' },
    { Icon: Rss, href: '/rss', label: 'RSS' },
  ];

  return (
    // 데스크톱 아래 여백은 global.css(가림 높이 - 13px). 가림 띠(z-30)보다 위층에 둬서 아이콘의 포커스 테두리가 잘리지 않게 한다.
    <header className='portfolio-sidebar pt-14 lg:sticky lg:top-0 lg:z-[31] lg:flex lg:h-dvh lg:flex-col lg:justify-between lg:overflow-y-auto lg:pt-[var(--sidebar-top)]'>
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
          className='mt-[23px] inline-flex items-center gap-2 rounded-md border border-line bg-surface px-3 py-1.5 font-code text-[13px] text-fg-strong transition-colors hover:border-accent hover:text-accent'
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
                    onClick={event => navigate(event, item.id)}
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

      {/* 하단: 링크. 아래 여백(가림 높이 - 13px) + 아이콘 칸 여백 약 13px = 가림 높이(보통 96px)로, 맨 아래로 스크롤했을 때 본문 하단 문구 아래 끝과 맞는다.
          (메인 page.tsx 하단 문구 여백과 짝. 화면이 높아도 어긋나지 않도록 사이드바 최대 높이는 제한하지 않는다) */}
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
