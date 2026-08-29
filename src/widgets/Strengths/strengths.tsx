'use client';

import { useEffect, useState } from 'react';
import { X, ArrowUpRight } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { strengths, trackRecord, type Strength } from '@/shared/data/site-data';

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-1 gap-1.5 border-b border-line py-4 last:border-b-0 sm:grid-cols-[104px_1fr] sm:gap-5'>
      <div className='pt-0.5 text-xs font-semibold uppercase tracking-[0.2em] text-accent'>{label}</div>
      <div className='text-sm leading-relaxed text-fg'>{children}</div>
    </div>
  );
}

function Modal({ item, onClose }: { item: Strength; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      className='fixed inset-0 z-[100] flex items-center justify-center bg-navy/60 p-4 backdrop-blur-sm'
      onClick={onClose}
    >
      <div
        className='max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-line bg-surface shadow-xl'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='sticky top-0 flex items-start justify-between gap-4 border-b border-line bg-surface px-6 py-5'>
          <div>
            <h3 className='text-lg font-bold text-fg-strong'>{item.title}</h3>
            {item.detail.period && (
              <div className='mt-1.5 font-mono text-xs text-accent'>{item.detail.period}</div>
            )}
            {item.detail.summary && (
              <div className='mt-1 text-xs leading-relaxed text-muted'>{item.detail.summary}</div>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label='닫기'
            className='shrink-0 rounded-full border border-line p-1.5 text-muted transition-colors hover:border-accent hover:text-accent'
          >
            <X size={16} />
          </button>
        </div>

        <div className='px-6 pb-2 pt-1'>
          {item.detail.context && <DetailRow label='Context'>{item.detail.context}</DetailRow>}
          <DetailRow label='Problem'>{item.detail.problem}</DetailRow>
          {item.detail.constraint && (
            <DetailRow label='Constraint'>{item.detail.constraint}</DetailRow>
          )}
          <DetailRow label='Solution'>{item.detail.solution}</DetailRow>
          <DetailRow label='Impact'>{item.detail.impact}</DetailRow>
          <div className='my-5 border-l-2 border-accent bg-surface-2 px-4 py-3 text-sm italic leading-relaxed text-muted'>
            {item.detail.insight}
          </div>
          {item.detail.tech && (
            <div className='border-t border-line py-4 text-xs text-muted'>
              <span className='font-semibold uppercase tracking-[0.2em] text-accent'>Tech</span>
              <span className='ml-3'>{item.detail.tech}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Strengths() {
  const [selected, setSelected] = useState<Strength | null>(null);

  return (
    <Section id='strengths' label='Strengths'>
      <div className='grid grid-cols-1 gap-4'>
        {strengths.map((s) => (
          <button
            key={s.title}
            onClick={() => setSelected(s)}
            className='group flex h-full flex-col rounded-lg border border-line bg-surface p-6 text-left transition-colors hover:border-accent'
          >
            <div className='flex items-start justify-between gap-3'>
              <h3 className='font-bold leading-snug text-fg-strong group-hover:text-accent'>
                {s.title}
              </h3>
              <ArrowUpRight
                size={16}
                className='mt-0.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent'
              />
            </div>
            <ul className='mt-2 flex-1 space-y-1.5'>
              {s.points
                .flatMap((p) => p.split(/(?<=\.)\s+/))
                .map((line, i) => (
                  <li key={i} className='flex gap-2 text-sm leading-relaxed text-muted'>
                    <span aria-hidden className='shrink-0 text-lg leading-[1.42rem] text-accent'>
                      ·
                    </span>
                    <span>{line.replace(/\.$/, '')}</span>
                  </li>
                ))}
            </ul>
            <ul className='mt-5 space-y-1 border-t border-line pt-4'>
              {s.result.map((r, i) => (
                <li key={i} className='text-sm font-medium leading-relaxed text-fg-strong'>
                  {r}
                </li>
              ))}
            </ul>
            <div className='mt-4 flex flex-wrap gap-2'>
              {s.tags.map((t) => (
                <span
                  key={t}
                  className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent'
                >
                  {t}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className='mt-10 border-t border-line pt-8'>
        <div className='mb-4 flex items-baseline gap-3'>
          <h3 className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>Track Record</h3>
          <span className='text-xs text-muted'>그 외 담당 과제 {trackRecord.length}건</span>
        </div>
        <ul>
          {trackRecord.map((t, i) => (
            <li
              key={i}
              className='flex flex-col gap-1 border-b border-line py-2.5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4'
            >
              <span className='shrink-0 font-mono text-xs text-accent sm:w-[68px]'>{t.period}</span>
              <span className='flex-1 text-sm leading-snug text-fg'>{t.title}</span>
              <span className='shrink-0 font-mono text-[11px] text-muted'>{t.service}</span>
            </li>
          ))}
        </ul>
      </div>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </Section>
  );
}
