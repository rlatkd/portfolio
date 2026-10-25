import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { projects } from '@/shared/data/site-data';
import DeviceMockup from '../../_components/DeviceMockup';
import styles from '../../demo.module.css';

type Props = { params: Promise<{ id: string }> };

// 저장소 코드 기준으로 메인 화면을 재현·캡처한 목업 이미지 (제목이 이미지 안에 포함됨)
const mockups: Record<string, string> = {
  'cms-plus': '/images/demo/cms-plus-mockup.png',
  'sale-sync': '/images/demo/sale-sync-pos-mockup.png',
};

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  return { title: projects.find((p) => p.id === id)?.title ?? 'Project' };
}

export default async function ProjectPage({ params }: Props) {
  const { id } = await params;
  const index = projects.findIndex((p) => p.id === id);
  if (index < 0) notFound();
  const p = projects[index];
  const next = projects[(index + 1) % projects.length];
  const [lead, ...rest] = p.points;

  const summary = [
    { label: '형태 · 기간', value: p.context },
    { label: '기술', value: p.tags.join(' · ') },
    { label: '저장소', value: p.href ? p.href.replace('https://', '') : '비공개' },
  ];

  return (
    <>
      {/* 히어로 — 목업 이미지가 있으면 이미지, 없으면 CSS 목업 장면 */}
      {mockups[p.id] ? (
        <section className='bg-navy pt-24 dark:bg-surface'>
          <h1 className='sr-only'>{p.title}</h1>
          <Image src={mockups[p.id]} alt={`${p.title} 메인 화면 목업`} width={3200} height={2000} priority sizes='100vw' className='h-auto w-full' />
        </section>
      ) : (
      <section className='overflow-hidden bg-navy px-4 pb-28 pt-32 text-cream dark:bg-surface md:px-10 md:pb-32'>
        <div className='mx-auto grid min-h-[70svh] max-w-6xl items-center gap-16 md:grid-cols-[1fr_1.15fr]'>
          <div className='relative z-10'>
            <p className={`${styles.serif} text-lg text-gold-light md:text-xl`}>
              Side Project {String(index + 1).padStart(2, '0')}
            </p>
            <h1 className='mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl'>{p.title}</h1>
            <p className='mt-4 text-sm text-cream/70'>{p.context}</p>
          </div>
          <DeviceMockup image={p.image} alt={`${p.title} 화면`} fit={p.imageFit} cardTitle={p.title} cardTags={p.tags.slice(0, 3)} />
        </div>
      </section>
      )}

      {/* 요약 */}
      <section className='bg-surface-2 px-4 py-16 md:px-10'>
        <div className='mx-auto max-w-6xl'>
          <p className={`${styles.serif} text-xl text-fg-strong`}>Project Summary</p>
          <dl className='mt-6 grid border-t border-line md:grid-cols-3'>
            {summary.map((item) => (
              <div key={item.label} className='border-b border-line py-6 md:border-b-0 md:border-r md:px-5 md:last:border-r-0'>
                <dt className='text-xs font-bold text-accent'>{item.label}</dt>
                <dd className='mt-3 text-sm [overflow-wrap:anywhere] leading-relaxed text-fg-strong'>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 개요 — 첫 항목을 크게 */}
      <section className='px-4 py-20 md:px-10 md:py-28'>
        <div className='mx-auto max-w-6xl'>
          <p className={`${styles.serif} text-xl text-muted`}>Overview</p>
          <p className='mt-6 max-w-4xl text-2xl font-bold leading-snug tracking-tight text-fg-strong md:text-4xl'>{lead}</p>
        </div>
      </section>

      {/* 나머지 항목 — 번호 섹션 */}
      {rest.length > 0 && (
        <section className='bg-navy px-4 py-20 text-cream dark:bg-surface md:px-10 md:py-28'>
          <ol className='mx-auto max-w-6xl border-t border-cream/20'>
            {rest.map((pt, i) => (
              <li key={pt} className='grid gap-4 border-b border-cream/20 py-10 md:grid-cols-[8rem_1fr]'>
                <span className='text-4xl font-bold text-gold-light'>{String(i + 1).padStart(2, '0')}</span>
                <p className='text-base leading-[1.9] text-cream/85 md:text-lg'>{pt}</p>
              </li>
            ))}
          </ol>
          {p.href && (
            <div className='mx-auto mt-10 max-w-6xl'>
              <a
                href={p.href}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-1.5 border-b border-gold-light pb-0.5 text-sm font-semibold text-gold-light'
              >
                GitHub에서 보기 <ArrowUpRight size={16} />
              </a>
            </div>
          )}
        </section>
      )}

      {/* 다음 프로젝트 */}
      <section className='border-t-2 border-fg-strong px-4 py-20 md:px-10'>
        <Link href={`/demo/projects/${next.id}`} className='group mx-auto block max-w-6xl'>
          <p className={`${styles.serif} text-muted`}>Next Project</p>
          <p className='mt-3 flex items-center justify-between gap-6 text-2xl font-bold text-fg-strong group-hover:text-accent md:text-4xl'>
            {next.title}
            <ArrowRight className='shrink-0 transition-transform group-hover:translate-x-1' size={32} />
          </p>
        </Link>
      </section>
    </>
  );
}
