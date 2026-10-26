'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Tags } from '@/shared/ui/Section';
import type { Project } from '@/shared/types/portfolio';

const INTERVAL = 3500;

// Auto-advance pauses for reading, keyboard navigation and reduced-motion preferences.
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
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
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
                  <h3 className='font-semibold text-fg-strong'>{p.title}</h3>
                  <p className='my-1 text-xs text-muted'>{p.context}</p>
                  <p className='text-[13px] leading-[1.9]'>{p.summary}</p>
                  <Tags items={[...p.tags].sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))} />
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
          <button type='button' aria-label='이전 프로젝트' onClick={() => move(-1)} className='flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-strong transition-colors hover:border-accent hover:text-accent'>
            <ArrowLeft size={16} />
          </button>
          <button type='button' aria-label='다음 프로젝트' onClick={() => move(1)} className='flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg-strong transition-colors hover:border-accent hover:text-accent'>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
