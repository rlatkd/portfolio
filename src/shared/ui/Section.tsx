import type { ReactNode } from 'react';

type SectionProps = {
  id?: string;
  label?: string;
  children: ReactNode;
  className?: string;
};

/** 우측 본문 컬럼용 섹션 — 모노 라벨 + 콘텐츠 */
export function Section({ id, label, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`scroll-mt-16 py-10 md:py-14 ${className}`}>
      {label && (
        <h2 className='mb-6 font-mono text-xs uppercase tracking-label text-accent'>{label}</h2>
      )}
      {children}
    </section>
  );
}
