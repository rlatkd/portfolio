'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { strengths, type Strength } from '@/shared/data/site-data';

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className='grid grid-cols-1 gap-1.5 border-b border-line py-4 last:border-b-0 sm:grid-cols-[90px_1fr] sm:gap-5'>
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
              <div className='mt-1 text-xs text-muted'>{item.detail.period}</div>
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

        <div className='px-6 py-2'>
          <div className='flex flex-wrap gap-2 py-4'>
            {item.tags.map((t) => (
              <span
                key={t}
                className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent'
              >
                {t}
              </span>
            ))}
          </div>
          <DetailRow label='Problem'>{item.detail.problem}</DetailRow>
          <DetailRow label='Solution'>{item.detail.solution}</DetailRow>
          <DetailRow label='Impact'>{item.detail.impact}</DetailRow>
          <div className='my-5 border-l-2 border-accent bg-surface-2 px-4 py-3 text-sm italic leading-relaxed text-muted'>
            {item.detail.insight}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Strengths() {
  const [selected, setSelected] = useState<Strength | null>(null);

  return (
    <Section id='strengths' label='Core Strengths'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {strengths.map((s) => (
          <button
            key={s.title}
            onClick={() => setSelected(s)}
            className='flex flex-col rounded-lg border border-line bg-surface p-6 text-left transition-colors hover:border-accent'
          >
            <h3 className='font-bold text-fg-strong'>{s.title}</h3>
            <p className='mt-2 flex-1 text-sm leading-relaxed text-muted'>{s.desc}</p>
            <div className='mt-4 flex flex-wrap items-center gap-2'>
              {s.tags.map((t) => (
                <span
                  key={t}
                  className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent'
                >
                  {t}
                </span>
              ))}
              <span className='ml-auto text-xs text-muted'>자세히 →</span>
            </div>
          </button>
        ))}
      </div>

      {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
    </Section>
  );
}
