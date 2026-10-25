import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Layers, Route, Wrench } from 'lucide-react';
import {
  aboutIntro,
  careerServices,
  experience,
  trackRecord,
  education,
  training,
  certifications,
  awards,
  skillGroups,
} from '@/shared/data/site-data';
import styles from '../demo.module.css';

export const metadata: Metadata = { title: 'Profile' };

// aboutIntro 4·5번째 문단을 작업 방식 카드로 사용
const howIWork = [
  { icon: Wrench, title: '제약과 처리 방식 확인', body: aboutIntro[3] },
  { icon: Route, title: '불확실한 요청 추적', body: aboutIntro[4] },
];

export default function ProfilePage() {
  return (
    <>
      {/* 히어로 */}
      <section className='flex min-h-[100svh] flex-col items-center justify-center px-4 pt-24 text-center'>
        <h1 className='text-[2rem] leading-tight tracking-tight text-fg-strong md:text-6xl'>
          <span className='block font-light'>계약·결제·정산이 고객사에 닿는</span>
          <span className='block font-bold text-accent'>채널 계층을 담당합니다</span>
        </h1>
        <p className={`${styles.serif} mt-8 text-lg text-muted md:text-xl`}>Channel Development → Operations → Service Owner</p>
        <div className='mt-4 max-w-3xl space-y-1 text-sm leading-relaxed text-muted md:text-base'>
          {aboutIntro.slice(0, 3).map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
        <p className='mt-16 text-xs tracking-[0.3em] text-muted'>SCROLL</p>
      </section>

      {/* How I Work */}
      <section className='border-t-2 border-fg-strong px-4 py-20 md:px-10 md:py-28'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid gap-6 md:grid-cols-[1fr_3fr]'>
            <p className={`${styles.serif} text-xl text-muted`}>How I Work</p>
            <h2 className='text-3xl font-bold leading-snug tracking-tight text-fg-strong md:text-5xl'>
              제약을 먼저 확인하고
              <br />
              고칠 범위를 정합니다
            </h2>
          </div>
          <div className='mt-14 grid border-t-2 border-fg-strong md:grid-cols-3'>
            {howIWork.map(({ icon: Icon, title, body }) => (
              <div key={title} className='border-b border-line py-8 md:border-b-0 md:border-r md:px-8 md:first:pl-0'>
                <Icon className='text-accent' size={26} />
                <h3 className='mt-5 text-xl font-bold text-fg-strong'>{title}</h3>
                <p className='mt-4 text-sm leading-relaxed text-muted'>{body}</p>
              </div>
            ))}
            <div className='py-8 md:px-8'>
              <Layers className='text-accent' size={26} />
              <h3 className='mt-5 text-xl font-bold text-fg-strong'>담당 서비스 {careerServices.length}개</h3>
              <ul className='mt-4 flex flex-wrap gap-2'>
                {careerServices.map((s) => (
                  <li key={s.name} className='rounded-full border border-line px-3 py-1 text-xs text-fg'>
                    <span className='font-semibold text-fg-strong'>{s.name}</span> · {s.kind}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 경력 */}
      <section className='bg-navy px-4 py-20 text-cream dark:bg-surface md:px-10 md:py-28'>
        <div className='mx-auto max-w-6xl'>
          <p className={`${styles.serif} text-xl text-gold-light`}>Experience</p>
          <ol className='mt-10 border-t border-cream/20'>
            {experience.map((e) => (
              <li key={e.id} className='grid gap-4 border-b border-cream/20 py-10 md:grid-cols-[1fr_3fr]'>
                <p className='text-sm text-cream/60'>{e.period}</p>
                <div>
                  <h3 className='text-xl font-bold md:text-2xl'>{e.role}</h3>
                  <p className='mt-1 text-sm text-gold-light'>{e.org}</p>
                  {e.desc && <p className='mt-4 text-sm leading-relaxed text-cream/85'>{e.desc}</p>}
                  {e.points.length > 0 && (
                    <ul className='mt-4 space-y-2 text-sm leading-relaxed text-cream/75'>
                      {e.points.map((p) => (
                        <li key={p}>· {p}</li>
                      ))}
                    </ul>
                  )}
                  {e.id === 'hyosung-fms' && (
                    <div className='mt-8 rounded-lg border border-cream/20 p-5'>
                      <p className={`${styles.serif} text-gold-light`}>Track Record</p>
                      <ul className='mt-3 divide-y divide-cream/10 text-sm'>
                        {trackRecord.map((t) => (
                          <li key={`${t.period}-${t.title}`} className='grid grid-cols-[4.5rem_1fr] gap-3 py-2.5 md:grid-cols-[4.5rem_1fr_auto]'>
                            <span className='text-cream/60'>{t.period}</span>
                            <span>{t.title}</span>
                            <span className='col-start-2 text-xs text-gold-light md:col-start-auto'>{t.service}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 학력·교육·자격·수상 */}
      <section className='px-4 py-20 md:px-10 md:py-28'>
        <div className='mx-auto grid max-w-6xl gap-14 md:grid-cols-2'>
          <div>
            <p className={`${styles.serif} text-xl text-muted`}>Education</p>
            <ul className='mt-6 divide-y divide-line border-t-2 border-fg-strong'>
              {education.map((e) => (
                <li key={e.org} className='py-5'>
                  <p className='text-xs text-muted'>{e.period}</p>
                  <p className='mt-1 font-bold text-fg-strong'>{e.org}</p>
                  <p className='text-sm text-fg'>{e.detail}</p>
                  {e.note && <p className='mt-1 text-xs text-muted'>{e.note}</p>}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`${styles.serif} text-xl text-muted`}>Training</p>
            <ul className='mt-6 divide-y divide-line border-t-2 border-fg-strong'>
              {training.map((t) => (
                <li key={t.title} className='py-5'>
                  <p className='text-xs text-muted'>{t.period}</p>
                  <p className='mt-1 font-bold text-fg-strong'>{t.title}</p>
                  <p className='text-sm text-fg'>
                    {t.org} · {t.hours}
                  </p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`${styles.serif} text-xl text-muted`}>Certifications</p>
            <ul className='mt-6 divide-y divide-line border-t-2 border-fg-strong'>
              {certifications.map((c) => (
                <li key={c.id} className='flex justify-between gap-4 py-5'>
                  <span>
                    <span className='block font-bold text-fg-strong'>{c.name}</span>
                    <span className='text-sm text-fg'>{c.org}</span>
                  </span>
                  <span className='text-xs text-muted'>{c.date}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={`${styles.serif} text-xl text-muted`}>Awards</p>
            <ul className='mt-6 divide-y divide-line border-t-2 border-fg-strong'>
              {awards.map((a) => (
                <li key={`${a.date}-${a.title}-${a.org}`} className='flex justify-between gap-4 py-5'>
                  <span>
                    <span className='block font-bold text-fg-strong'>{a.title}</span>
                    <span className='text-sm text-fg'>{a.org}</span>
                  </span>
                  <span className='text-xs text-muted'>{a.date}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 기술 스택 */}
      <section className='bg-surface-2 px-4 py-20 md:px-10'>
        <div className='mx-auto max-w-6xl'>
          <p className={`${styles.serif} text-xl text-muted`}>Tech Stack</p>
          <dl className='mt-6 grid gap-x-10 border-t-2 border-fg-strong sm:grid-cols-2 lg:grid-cols-3'>
            {skillGroups.map((g) => (
              <div key={g.label} className='border-b border-line py-4'>
                <dt className='text-xs font-bold text-accent'>{g.label}</dt>
                <dd className='mt-2 text-sm text-fg-strong'>{g.items.join(' · ')}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 다음 페이지 */}
      <section className='border-t-2 border-fg-strong px-4 py-20 md:px-10'>
        <Link href='/demo/case/1' className='group mx-auto block max-w-6xl'>
          <p className={`${styles.serif} text-muted`}>Case Study</p>
          <p className='mt-3 flex items-center justify-between gap-6 text-2xl font-bold text-fg-strong group-hover:text-accent md:text-4xl'>
            주요 과제에서 과정을 확인해 보세요
            <ArrowRight className='shrink-0 transition-transform group-hover:translate-x-1' size={32} />
          </p>
        </Link>
      </section>
    </>
  );
}
