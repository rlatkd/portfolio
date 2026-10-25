import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { FiGithub, FiLinkedin } from 'react-icons/fi';
import { profile, aboutQuote, projects } from '@/shared/data/site-data';
import HeroPills from './_components/HeroPills';
import CopyEmail from './_components/CopyEmail';
import { cases } from './_components/cases';
import styles from './demo.module.css';

const capabilities = [
  { title: '채널 개발', desc: 'CMS+를 포함한 6개 서비스의 백엔드·프론트엔드 · Spring Boot, Vue.js' },
  { title: '운영 겸무', desc: '2025.10부터 CMS+·Ibill 배치 모니터링과 VoC 대응' },
  { title: 'Ibill 오너', desc: '2026.08부터 요구사항 검토, 개선·신규·보류 결정, 원인 분석부터 배포까지' },
  { title: '신규 구축 참여', desc: '전자계약 화면·파트너 연동 구현 분담, Branch Manager 결제·정산 담당' },
];

const steps = ['현상 확인', '기존 처리 방식의 목적 확인', '제약 확인', '수정 범위 결정', '구현·검증'];
const stepTone = [
  'bg-cream-dark text-navy',
  'bg-gold-light/50 text-navy',
  'bg-gold-light text-navy',
  'bg-gold text-navy',
  'bg-navy text-cream dark:bg-surface-2',
];

export default function DemoPage() {
  const [quoteLead, quoteTail] = aboutQuote.text.split('\n');

  return (
    <>
      {/* 히어로 */}
      <section className='relative flex h-[100svh] min-h-[640px] items-center justify-center overflow-hidden px-4'>
        <HeroPills />
        <div className='relative z-10 text-center'>
          <h1 className='text-[2rem] leading-tight tracking-tight text-fg-strong md:text-6xl'>
            <span className='block font-light'>직접 수정할 수 없는</span>
            <span className='block font-bold text-accent'>외부 시스템과 연동하며</span>
            <span className='block font-bold'>문제를 해결해 왔습니다</span>
          </h1>
          <p className={`${styles.serif} mt-6 text-lg text-muted md:text-xl`}>Channel · Batch · Integration</p>
          <p className='mt-2 text-sm text-muted md:text-base'>{quoteTail ?? quoteLead}</p>
        </div>
      </section>

      {/* 주요 과제 — 네이비 밴드, 항목마다 상세 페이지로 이동 */}
      <section className='bg-navy px-4 py-24 text-cream dark:bg-surface md:px-10 md:py-32'>
        <div className='mx-auto max-w-6xl'>
          <p className={`${styles.serif} text-gold-light`}>Case Study</p>
          <h2 className='mt-3 text-3xl font-bold leading-snug md:text-5xl'>
            효성에프엠에스에서 다룬
            <br />
            주요 과제입니다
          </h2>

          <ol className='mt-14 border-t border-cream/20'>
            {cases.map(({ no, href, strength: s }) => (
              <li key={href} className='border-b border-cream/20'>
                <Link href={href} className='group flex gap-5 py-7 md:gap-10'>
                  <span className={`${styles.serif} pt-1 text-xl text-gold-light md:text-2xl`}>{String(no).padStart(2, '0')}</span>
                  <span className='flex-1'>
                    <span className='block text-lg font-bold leading-snug group-hover:text-gold-light md:text-2xl'>{s.title}</span>
                    <span className='mt-2 block text-sm font-semibold text-gold-light'>{s.detail.summary}</span>
                    <span className='mt-1 block text-xs text-cream/60'>{s.detail.period}</span>
                  </span>
                  <ArrowUpRight aria-hidden size={22} className='mt-1 shrink-0 text-gold-light transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5' />
                </Link>
              </li>
            ))}
          </ol>

          <div className='mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
            {capabilities.map((c) => (
              <div key={c.title} className='border-t border-cream/30 pt-4'>
                <h3 className='font-bold'>{c.title}</h3>
                <p className='mt-2 text-sm leading-relaxed text-cream/75'>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 대표 수치 + 접근 순서 */}
      <section className='px-4 py-24 md:px-10 md:py-32'>
        <div className='mx-auto max-w-6xl'>
          <div className='grid items-end gap-12 md:grid-cols-[1.3fr_1fr]'>
            <h2 className='text-3xl font-bold leading-snug tracking-tight text-fg-strong md:text-5xl'>
              한 응답에 담기는 행 수를
              <br />
              1,000건으로 제한해
              <br />
              <span className='text-accent'>대량 엑셀 추출을</span>
              <br />
              <span className='text-accent'>직접 신청할 수 있게 했습니다.</span>
            </h2>
            <div className='text-right'>
              <p className='text-2xl text-muted line-through md:text-3xl'>5만 건 제한</p>
              <p className='text-7xl font-bold leading-none tracking-tighter text-accent md:text-9xl'>15만 건</p>
              <p className='mt-3 text-lg font-semibold text-fg-strong'>8분 내 추출</p>
            </div>
          </div>
          <p className='mt-10 max-w-2xl text-sm leading-relaxed text-muted'>
            계정계 API와 쿼리를 수정하지 않고 1,000건 단위 순차 조회와 SXSSF 스트리밍으로 처리했습니다. 매월 담당자가 별도 프로그램으로 추출하던 작업이 없어졌습니다.
          </p>
          <p className='mt-2 text-xs text-muted'>※ 메모리 문제라는 판단은 장애 현상과 개선 결과에 근거한 추론입니다.</p>

          <p className={`${styles.serif} mt-24 text-muted`}>Approach</p>
          <h3 className='mt-2 text-2xl font-bold text-fg-strong md:text-3xl'>기존 코드를 고치기 전에 확인하는 순서</h3>
          <ol className='mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5'>
            {steps.map((step, i) => (
              <li key={step} className={`flex min-h-[9rem] flex-col justify-between rounded-md border border-line p-5 ${stepTone[i]}`}>
                <span className={`${styles.serif} text-3xl font-bold not-italic`}>{i + 1}</span>
                <span className='text-lg font-bold'>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 하위 페이지 */}
      <section className='border-t border-line px-4 py-20 md:px-10'>
        <div className='mx-auto max-w-6xl'>
          <p className={`${styles.serif} text-muted`}>More</p>
          <ul className='mt-6 divide-y divide-line border-y border-line'>
            {[
              { href: '/demo/profile', label: '프로필 · 경력', meta: '2024.09 — 현재' },
              { href: `/demo/projects/${projects[0].id}`, label: '사이드 프로젝트', meta: `${projects.length}건` },
              { href: '/posts', label: '기술 블로그', meta: 'velog 원문' },
            ].map((row) => (
              <li key={row.href}>
                <Link href={row.href} className='group flex items-center justify-between gap-4 py-6'>
                  <span className='text-xl font-bold text-fg-strong group-hover:text-accent md:text-2xl'>{row.label}</span>
                  <span className='flex items-center gap-3 text-sm text-muted'>
                    {row.meta}
                    <ArrowUpRight size={18} className='text-accent' />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 연락처 */}
      <section className='border-t-2 border-fg-strong px-4 py-20 text-center md:py-28'>
        <h2 className='text-2xl font-bold tracking-tight text-fg-strong md:text-4xl'>채널 개발과 운영에 관해 이야기 나누고 싶습니다</h2>
        <div className='mt-10 flex flex-col items-center justify-center gap-8 text-sm sm:flex-row sm:gap-16'>
          <div>
            <p className={`${styles.serif} text-muted`}>Email</p>
            <div className='mt-1'>
              <CopyEmail email={profile.email} />
            </div>
          </div>
          <div>
            <p className={`${styles.serif} text-muted`}>GitHub</p>
            <a href={profile.github} className='mt-1 inline-flex items-center gap-1.5 font-semibold text-fg-strong hover:text-accent'>
              <FiGithub aria-hidden /> {profile.githubLabel}
            </a>
          </div>
          <div>
            <p className={`${styles.serif} text-muted`}>LinkedIn</p>
            <a href={profile.linkedin} className='mt-1 inline-flex items-center gap-1.5 font-semibold text-fg-strong hover:text-accent'>
              <FiLinkedin aria-hidden /> {profile.linkedinLabel}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
