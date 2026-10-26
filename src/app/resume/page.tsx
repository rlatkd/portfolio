import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { profile, trackRecord } from '@/shared/data/site-data';
import { summary, companyRoles, work, education, skills, others, aiExperience } from '@/shared/data/resume-data';
import { PrintButton } from './print-button';
import { ResumePager } from './resume-pager';
import { baseUrl, defaultOgImage } from '@/shared/config/site';

// 경력 항목 쪽 배분: 1쪽 2건, 2쪽 4건, 나머지는 3쪽
const WORK_ON_FIRST_PAGE = 2;
const WORK_UNTIL_SECOND_PAGE = 6;

export const metadata: Metadata = {
  title: '이력서',
  description: '김상훈 이력서 — 경력, 학력, 기술, 수상·자격·교육',
  alternates: { canonical: '/resume' },
  openGraph: {
    title: '김상훈 이력서',
    description: '김상훈의 경력, 학력, 기술, 수상·자격·교육을 정리한 이력서.',
    url: `${baseUrl}/resume`,
    type: 'website',
    siteName: '김상훈',
    locale: 'ko_KR',
    images: [{ url: `${defaultOgImage}?title=${encodeURIComponent('김상훈 이력서')}`, width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '김상훈 이력서',
    description: '김상훈의 경력, 학력, 기술, 수상·자격·교육을 정리한 이력서.',
    images: [`${defaultOgImage}?title=${encodeURIComponent('김상훈 이력서')}`],
  },
  robots: { index: false, follow: true },
};

function Heading({ children }: { children: React.ReactNode }) {
  return <h2 className='mb-4 border-b border-line pb-2 text-[15px] font-bold text-fg-strong'>{children}</h2>;
}

function Head({ title, period }: { title: string; period: string }) {
  return (
    <div className='flex flex-row items-baseline justify-between gap-4'>
      <h3 className='text-[12.5px] font-semibold text-fg-strong'>{title}</h3>
      <span className='shrink-0 text-[11px] text-muted'>{period}</span>
    </div>
  );
}

function WorkItem({ w, first = false }: { w: (typeof work)[number]; first?: boolean }) {
  return (
    <article className={first ? '' : 'mt-5'}>
      <Head title={w.title} period={w.period} />
      <p className='text-[11px] text-muted'>{w.role}</p>
      <ul className='mt-1.5 list-disc space-y-0.5 pl-4'>
        {w.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className='mt-1 text-[11px] text-muted'>사용 기술: {w.tech}</p>
    </article>
  );
}

export default function ResumePage() {
  return (
    <div className='min-h-screen px-3 py-6 sm:px-6 sm:py-8 print:p-0 [word-break:keep-all]'>
      <div className='mx-auto mb-5 flex max-w-[794px] items-center justify-between print:hidden'>
        <Link href='/' className='inline-flex items-center gap-2 text-sm text-muted hover:text-accent'>
          <ArrowLeft size={15} /> 포트폴리오
        </Link>
        <PrintButton />
      </div>

      <main id='main-content'>
        <ResumePager>
          {/* 1쪽 — 인적사항 · 요약 · 경력 앞부분 */}
          <div>
            <header className='flex flex-row items-center justify-between gap-4 border-b-2 border-fg-strong pb-5'>
              <div>
                <h1 className='text-3xl font-bold tracking-tight text-fg-strong'>{profile.name}</h1>
                <p className='text-sm text-muted'>{profile.role}</p>
              </div>
              <div className='flex flex-col items-end text-xs'>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
                <a href={profile.github} className='inline-flex items-center gap-1'>
                  {profile.githubLabel}
                </a>
                <a href='https://www.sanghunkim.com' className='inline-flex items-center gap-1'>
                  sanghunkim.com
                </a>
              </div>
            </header>
            <div className='mt-5 space-y-2.5'>
              {summary.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <section className='mt-8'>
              <Heading>경력</Heading>
              {/* 회사 — 아래 과제들과 구분되도록 회색 박스 */}
              <div className='bg-surface-2 px-4 py-3'>
                <div className='flex items-baseline justify-between gap-4'>
                  <h3 className='text-[14px] font-bold text-fg-strong'>효성에프엠에스</h3>
                  <span className='shrink-0 text-[11px] text-muted'>2024.09 — 재직중</span>
                </div>
                <p className='text-[11px] text-muted'>개발팀 (Application Platform) · 선임 · 정규직</p>
                <ul className='mt-1.5 space-y-0.5'>
                  {companyRoles.map((r) => (
                    <li key={r.date} className='grid grid-cols-[3.5rem_1fr] gap-x-3'>
                      <span className='tabular-nums'>{r.date}</span>
                      <span>{r.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <h3 className='mt-5 text-[11px] font-bold uppercase tracking-wider text-muted'>주요 수행 과제</h3>
              {work.slice(0, WORK_ON_FIRST_PAGE).map((w) => (
                <WorkItem key={w.title} w={w} />
              ))}
            </section>
          </div>

          {/* 2쪽 — 경력 이어서 */}
          <section>
            <Heading>경력</Heading>
            <h3 className='mb-5 text-[11px] font-bold uppercase tracking-wider text-muted'>주요 수행 과제</h3>
            {work.slice(WORK_ON_FIRST_PAGE, WORK_UNTIL_SECOND_PAGE).map((w, i) => (
              <WorkItem key={w.title} w={w} first={i === 0} />
            ))}
          </section>

          {/* 3쪽 — 경력 나머지 · 그 외 담당 업무 */}
          <div>
            <section>
              <Heading>경력</Heading>
              <h3 className='mb-5 text-[11px] font-bold uppercase tracking-wider text-muted'>주요 수행 과제</h3>
              {work.slice(WORK_UNTIL_SECOND_PAGE).map((w, i) => (
                <WorkItem key={w.title} w={w} first={i === 0} />
              ))}
            </section>
            <section className='mt-8'>
              <Heading>그 외 담당 업무</Heading>
              <ul className='space-y-1'>
                {trackRecord
                  .filter((t) => !t.title.startsWith('Sparrow SAST'))
                  .map((t) => (
                    <li key={`${t.period}-${t.title}`} className='grid grid-cols-[4rem_1fr_7rem] gap-3'>
                      <span className='text-[11px] text-muted'>{t.period}</span>
                      <span>{t.title}</span>
                      <span className='text-right text-[11px] text-muted'>{t.service}</span>
                    </li>
                  ))}
              </ul>
            </section>
          </div>

          {/* 4쪽 — AI 활용 경험 · 스킬 · 학력 · 수상 */}
          <div>

            <section>
              <Heading>AI 활용 경험</Heading>
              <Head title='암호화폐 퀀트 분석 대시보드' period='2026 · 개인 프로젝트' />
              <ul className='mt-1.5 list-disc space-y-0.5 pl-4'>
                {aiExperience.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </section>
            <section className='mt-8'>
              <Heading>스킬</Heading>
              <p>{skills.join(' · ')}</p>
            </section>
            <section className='mt-8'>
              <Heading>학력</Heading>
              {education.map((e) => (
                <article key={e.title} className='mt-4 first:mt-0'>
                  <Head title={e.title} period={e.period} />
                  <p className='text-[11px] text-muted'>{e.sub}</p>
                  <div className='mt-1.5 space-y-0.5'>
                    {e.lines.map((l) => (
                      <p key={l}>{l}</p>
                    ))}
                  </div>
                </article>
              ))}
            </section>
            <section className='mt-6'>
              <Heading>수상</Heading>
              {others.filter((o) => o.kind === '수상').map((o) => (
                <article key={o.title} className='mt-4 first:mt-0'>
                  <Head title={o.title} period={o.period} />
                  <p className='text-[11px] text-muted'>{o.org}</p>
                  <div className='mt-1 space-y-0.5'>
                    {o.lines.map((l) => <p key={l}>{l}</p>)}
                  </div>
                </article>
              ))}
            </section>
          </div>

          {/* 5쪽 — 자격증 · 교육 */}
          <div>
            {['자격증', '교육'].map((kind) => (
              <section key={kind} className='mt-6'>
                <Heading>{kind}</Heading>
                {others
                  .filter((o) => o.kind === kind)
                  .map((o) => (
                    <article key={o.title} className='mt-4 first:mt-0'>
                      <Head title={o.title} period={o.period} />
                      <p className='text-[11px] text-muted'>{o.org}</p>
                      <div className='mt-1 space-y-0.5'>
                        {o.lines.map((l) => (
                          <p key={l}>{l}</p>
                        ))}
                      </div>
                    </article>
                  ))}
              </section>
            ))}
          </div>
        </ResumePager>
      </main>
    </div>
  );
}
