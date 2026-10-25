'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Tags } from '@/shared/ui/Section';
import type { Project } from '@/shared/types/portfolio';

const INTERVAL = 3500;

// 프로젝트를 좌우로 슬라이드하는 캐러셀 — 일정 시간마다 자동으로 넘어가고, 마우스·포커스가 있으면 멈춤
export default function ProjectCarousel({ projects }: { projects: Project[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const move = useCallback((dir: 1 | -1) => setIndex((i) => (i + dir + projects.length) % projects.length), [projects.length]);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setTimeout(() => move(1), INTERVAL);
    return () => window.clearTimeout(timer);
  }, [index, paused, move]);

  return (
    <div
      aria-roledescription='carousel'
      aria-label='프로젝트 목록'
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className='overflow-hidden'>
        <ul className='flex transition-transform duration-[450ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none' style={{ transform: `translateX(-${index * 100}%)` }}>
          {projects.map((p, i) => {
            const active = i === index;
            const Card = p.href ? 'a' : 'div';
            return (
              <li key={p.id} aria-hidden={!active} className={`w-full shrink-0 transition-opacity duration-[450ms] ${active ? 'opacity-100' : 'opacity-40'}`}>
                <Card
                  href={p.href}
                  target={p.href ? '_blank' : undefined}
                  rel={p.href ? 'noopener noreferrer' : undefined}
                  aria-label={p.href ? `${p.title} GitHub` : undefined}
                  tabIndex={active ? undefined : -1}
                  className='group block overflow-hidden rounded-lg border border-line'
                >
                  <Image
                    src={`/images/${p.id}/slide.png`}
                    alt={`${p.title} 화면 목업`}
                    width={1600}
                    height={1000}
                    sizes='(min-width: 1024px) 560px, 100vw'
                    className='h-auto w-full transition-transform duration-300 group-hover:scale-[1.02]'
                  />
                </Card>
                <div className='mt-4 min-h-[6.5rem]'>
                  <p className='text-[13px] leading-[1.9]'>{p.summary}</p>
                  <Tags items={[...p.tags].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className='mt-4 flex items-center justify-between'>
        <div className='flex gap-1.5'>
          {projects.map((item, i) => (
            <button
              key={item.id}
              type='button'
              aria-label={`${i + 1}번째 프로젝트: ${item.title}`}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
              className={`relative h-1.5 overflow-hidden rounded-full transition-all ${i === index ? 'w-8 bg-line' : 'w-1.5 bg-line hover:bg-muted'}`}
            >
              {/* 현재 슬라이드의 자동 넘김 진행 표시 */}
              {i === index && (
                <span
                  key={`${index}-${paused}`}
                  className='absolute inset-y-0 left-0 bg-accent'
                  style={{ width: paused ? '100%' : undefined, animation: paused ? undefined : `carousel-progress ${INTERVAL}ms linear forwards` }}
                />
              )}
            </button>
          ))}
        </div>
        <div className='flex items-center gap-2'>
          <span className='mr-1 text-xs tabular-nums text-muted'>
            {index + 1} / {projects.length}
          </span>
          <button type='button' aria-label='이전 프로젝트' onClick={() => move(-1)} className='flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-strong transition-colors hover:border-accent hover:text-accent'>
            <ArrowLeft size={16} />
          </button>
          <button type='button' aria-label='다음 프로젝트' onClick={() => move(1)} className='flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-strong transition-colors hover:border-accent hover:text-accent'>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
