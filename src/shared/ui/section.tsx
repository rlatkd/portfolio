import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  label?: string;
  children: ReactNode;
  className?: string;
};

/** 우측 본문 컬럼용 섹션 — 작은 대문자 라벨 + 콘텐츠 */
export function Section({ id, label, children, className = '' }: SectionProps) {
  return (
    <section id={id} aria-labelledby={id ? `${id}-heading` : undefined} className={`mb-16 scroll-mt-16 lg:mb-24 lg:scroll-mt-24 ${className}`}>
      {label && (
        <h2 id={id ? `${id}-heading` : undefined} className='mb-6 text-[11px] font-bold uppercase tracking-[0.16em] text-fg-strong'>
          {label}
        </h2>
      )}
      {children}
    </section>
  );
}

/** 기술 태그 */
export function Tags({ items }: { items: string[] }) {
  return (
    <ul className='mt-3 flex flex-wrap gap-1.5'>
      {items.map((t) => (
        <li key={t} className='rounded-full bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] px-2.5 py-1 text-[11px] font-medium leading-none text-accent'>
          {t}
        </li>
      ))}
    </ul>
  );
}

/** 왼쪽 기간 · 오른쪽 내용의 2열 행 */
export function Row({ aside, children, className = '' }: { aside: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`grid gap-2 sm:grid-cols-[7rem_1fr] sm:gap-5 ${className}`}>
      <div className='pt-0.5 text-[11px] leading-relaxed text-muted sm:whitespace-nowrap'>{aside}</div>
      <div className='min-w-0'>{children}</div>
    </div>
  );
}
