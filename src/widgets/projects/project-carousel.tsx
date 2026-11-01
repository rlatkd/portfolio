'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '@/shared/types/portfolio';

const INTERVAL = 3500;

// 2026-11-01: 슬라이드를 이미지 대신 화면 구성 요소로 그린다. 왼쪽은 데이터의 부제·제목(사이트 토큰 색),
// 오른쪽은 CSS로 그린 기울어진 브라우저 틀 안에 원본 화면 캡처(project.image)를 넣는다.
// 새 프로젝트는 캡처 한 장과 데이터만 추가하면 같은 모양으로 나온다.
// 부제는 두 줄: 프로젝트 종류(인원 수 제외) / 기간. 예: '팀 프로젝트 4인 · 아키텍트 · 2024' → '팀 프로젝트' / '2024'
function slideContext(context: string) {
  const parts = context.split(' · ');
  return { kind: parts[0].replace(/\s*\d+인$/, ''), period: parts[parts.length - 1] };
}

function ProjectSlide({ project }: { project: Project }) {
  const { kind, period } = slideContext(project.context);
  return (
    <div className='relative aspect-[16/10] overflow-hidden bg-surface-2 [container-type:inline-size]'>
      <div className='absolute left-[6%] top-1/2 w-[38%] -translate-y-1/2'>
        <p className='font-code text-[max(9px,2.1cqw)] leading-snug text-accent'>{kind}<br />{period}</p>
        <p className='mt-[1.5cqw] text-[max(14px,5.4cqw)] font-bold leading-[1.2] tracking-tight text-fg-strong [word-break:keep-all]'>{project.title}</p>
      </div>
      <div className='absolute right-[5%] top-[17%] w-[49%] [perspective:1400px]'>
        <div className='overflow-hidden rounded-[1.2cqw] border border-line bg-surface shadow-[0_2cqw_5cqw_rgba(0,0,0,0.35)] transition-transform duration-300 [transform:rotateY(-16deg)_rotateX(5deg)_rotate(2deg)] group-hover:[transform:rotateY(-12deg)_rotateX(4deg)_rotate(1.5deg)]'>
          <div aria-hidden='true' className='flex items-center gap-[0.6cqw] px-[1.2cqw] py-[0.9cqw]'>
            {['bg-[var(--mac-close)]', 'bg-[var(--mac-minimize)]', 'bg-[var(--mac-zoom)]'].map(color => <span key={color} className={`h-[0.8cqw] w-[0.8cqw] rounded-full ${color}`} />)}
            <span className='ml-[1cqw] h-[1cqw] flex-1 rounded-full bg-surface-2' />
          </div>
          <div className={`relative aspect-[16/10] ${project.imageFit === 'contain' ? 'bg-white' : ''}`}>
            <Image
              src={project.image}
              alt={`${project.title} 화면`}
              fill
              sizes='(min-width: 1024px) 320px, 55vw'
              className={project.imageFit === 'contain' ? 'object-contain' : 'object-cover object-top'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

// Pause on image hover, keyboard navigation and reduced-motion preferences.
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const move = (dir: 1 | -1) => setIndex(i => (i + dir + projects.length) % projects.length);
  const paused = hovered || focused || reducedMotion;

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  if (!projects.length) return null;

  return (
    <div
      aria-roledescription='carousel'
      aria-label='프로젝트 목록'
      role='region'
      onFocus={() => setFocused(true)}
      onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}
    >
      <div className='overflow-hidden' style={{ touchAction: 'pan-y pinch-zoom' }}
        onTouchStart={event => { const point = event.touches[0]; touch.current = event.touches.length === 1 ? { x: point.clientX, y: point.clientY } : null; }}
        onTouchEnd={event => { const start = touch.current; touch.current = null; const point = event.changedTouches[0]; if (!start || !point) return; const dx = point.clientX - start.x; const dy = point.clientY - start.y; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1); }}>
        <ul className='flex transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none' style={{ transform: `translateX(-${index * 100}%)` }} aria-live={paused ? 'polite' : 'off'}>
          {projects.map((p, i) => {
            const active = i === index;
            const Card = p.href ? 'a' : 'div';
            return (
              <li key={p.id} aria-hidden={!active} inert={!active} className={`w-full shrink-0 transition-opacity duration-[450ms] ${active ? 'opacity-100' : 'opacity-40'}`}>
                <Card
                  href={p.href}
                  target={p.href ? '_blank' : undefined}
                  rel={p.href ? 'noopener noreferrer' : undefined}
                  aria-label={p.href ? `${p.title} GitHub` : undefined}
                  tabIndex={active ? undefined : -1}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  className='group block overflow-hidden rounded-lg border border-line'
                >
                  <ProjectSlide project={p} />
                </Card>
                <div className='mt-4 min-h-[6.5rem]'>
                  <h3 className='font-semibold text-fg-strong'>{p.title}</h3>
                  <p className='mt-1 text-[13px] leading-[1.9]'>{p.summary.split(/(?<=다\.) /).map((sentence, index) => <span key={index} className='block'>{sentence}</span>)}</p>
                  {/* 기술 스택: 고정폭 글꼴의 사각 칩 (VS Code 변수 이름 색) */}
                  <ul className='mt-3 flex flex-wrap gap-2'>
                    {[...p.tags].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' })).map(tag => (
                      <li key={tag} className='rounded-md border border-line px-2 py-0.5 font-code text-[12px] text-chip'>{tag}</li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className='mt-4 flex flex-wrap items-center justify-between gap-2'>
        <div className='flex'>
          {projects.map((item, i) => (
            <button
              key={item.id}
              type='button'
              aria-label={`${i + 1}번째 프로젝트: ${item.title}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
              className='flex h-11 w-6 items-center justify-center rounded'
            >
              <span aria-hidden='true' className={`relative h-1.5 overflow-hidden rounded-full bg-line ${i === index ? 'w-6' : 'w-1.5'}`}>
                {i === index && <span
                  key={index}
                  data-project-progress
                  className='absolute inset-y-0 left-0 bg-accent'
                  style={reducedMotion || projects.length < 2 ? { width: '100%' } : { width: 0, animation: `carousel-progress ${INTERVAL}ms linear forwards`, animationPlayState: paused ? 'paused' : 'running' }}
                  onAnimationEnd={() => {
                    if (!paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) move(1);
                  }}
                />}
              </span>
            </button>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <span className='mr-1 text-xs tabular-nums text-muted'>
            {index + 1} / {projects.length}
          </span>
          <button type='button' aria-label='이전 프로젝트' onClick={() => move(-1)} className='flex h-11 w-11 items-center justify-center rounded-md border border-line text-fg-strong transition-colors hover:border-accent hover:text-accent'>
            <ChevronLeft size={18} />
          </button>
          <button type='button' aria-label='다음 프로젝트' onClick={() => move(1)} className='flex h-11 w-11 items-center justify-center rounded-md border border-line text-fg-strong transition-colors hover:border-accent hover:text-accent'>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
