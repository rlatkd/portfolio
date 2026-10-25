import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { cases } from '../../_components/cases';
import styles from '../../demo.module.css';

type Props = { params: Promise<{ no: string }> };

export function generateStaticParams() {
  return cases.map((c) => ({ no: String(c.no) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { no } = await params;
  const c = cases.find((x) => String(x.no) === no);
  return { title: c ? c.label : 'Case Study' };
}

// 원문 문장은 그대로 두고, 읽기 쉽게 세 문장씩 문단으로 나눔
function toParagraphs(text: string) {
  const sentences = text.split(/(?<=다\.)\s+/);
  const out: string[] = [];
  for (let i = 0; i < sentences.length; i += 3) out.push(sentences.slice(i, i + 3).join(' '));
  return out;
}

export default async function CasePage({ params }: Props) {
  const { no } = await params;
  const index = cases.findIndex((c) => String(c.no) === no);
  if (index < 0) notFound();
  const { strength: s } = cases[index];
  const d = s.detail;
  const next = cases[(index + 1) % cases.length];

  const sections = [
    { key: 'Context', title: '배경', body: d.context },
    { key: 'Problem', title: '문제', body: d.problem },
    { key: 'Constraint', title: '제약', body: d.constraint },
    { key: 'Solution', title: '해결', body: d.solution },
    { key: 'Impact', title: '결과', body: d.impact },
    { key: 'Retrospect', title: '회고', body: d.insight },
  ].filter((x): x is { key: string; title: string; body: string } => Boolean(x.body));

  const summary = [
    { label: '기간 · 서비스', value: d.period },
    { label: '접근', value: s.points.join(' / ') },
    { label: '기술', value: d.tech },
    { label: '결과', value: s.result.join(' / ') },
  ];

  return (
    <>
      {/* 히어로 */}
      <section className='flex min-h-[100svh] items-end bg-navy px-4 pb-20 pt-32 text-cream dark:bg-surface md:px-10'>
        <div className='mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1.4fr_1fr] md:items-end'>
          <div>
            <p className={`${styles.serif} text-lg text-gold-light md:text-xl`}>Case Study {String(no).padStart(2, '0')}</p>
            <h1 className='mt-4 text-3xl font-bold leading-tight tracking-tight md:text-6xl'>{s.title}</h1>
          </div>
          <div className='border-t border-cream/30 pt-5'>
            <p className='text-xs font-bold tracking-widest text-gold-light'>{s.tags.join(' · ')}</p>
            <p className='mt-3 text-base leading-relaxed text-cream/85'>{d.summary}</p>
            <p className='mt-4 text-xs text-cream/60'>{d.period}</p>
          </div>
        </div>
      </section>

      {/* 요약 4칸 */}
      <section className='bg-surface-2 px-4 py-16 md:px-10'>
        <div className='mx-auto max-w-6xl'>
          <p className={`${styles.serif} text-xl text-fg-strong`}>Case Summary</p>
          <dl className='mt-6 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4'>
            {summary.map((item) => (
              <div key={item.label} className='border-b border-line py-6 sm:px-5 lg:border-b-0 lg:border-r lg:last:border-r-0'>
                <dt className='text-xs font-bold text-accent'>{item.label}</dt>
                <dd className='mt-3 text-sm leading-relaxed text-fg-strong'>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 본문 섹션 — 원문 그대로 */}
      {sections.map((sec, i) => {
        const dark = i % 2 === 1;
        return (
          <section key={sec.key} className={`px-4 py-20 md:px-10 md:py-28 ${dark ? 'bg-navy text-cream dark:bg-surface' : ''}`}>
            <div className='mx-auto grid max-w-6xl gap-10 md:grid-cols-[1fr_1.6fr]'>
              <div>
                <p className='flex items-baseline gap-3'>
                  <span className={`text-4xl font-bold ${dark ? 'text-gold-light' : 'text-accent'}`}>{String(i + 1).padStart(2, '0')}</span>
                  <span className={`${styles.serif} text-xl ${dark ? 'text-cream/80' : 'text-muted'}`}>{sec.key}</span>
                </p>
                <h2 className={`mt-4 text-3xl font-bold md:text-5xl ${dark ? '' : 'text-fg-strong'}`}>{sec.title}</h2>
              </div>
              <div className={`space-y-5 text-base leading-[1.9] ${dark ? 'text-cream/85' : 'text-fg'}`}>
                {toParagraphs(sec.body).map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* 다음 과제 */}
      <section className='border-t-2 border-fg-strong px-4 py-20 md:px-10'>
        <Link href={next.href} className='group mx-auto block max-w-6xl'>
          <p className={`${styles.serif} text-muted`}>Next Case</p>
          <p className='mt-3 flex items-center justify-between gap-6 text-2xl font-bold text-fg-strong group-hover:text-accent md:text-4xl'>
            {next.strength.title}
            <ArrowRight className='shrink-0 transition-transform group-hover:translate-x-1' size={32} />
          </p>
        </Link>
      </section>
    </>
  );
}
