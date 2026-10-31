import type { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import profilePhoto from '@public/images/resume/kim-sanghun-profile.webp';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { profile, trackRecord } from '@/shared/data/site-data';
import { summary, resume2Introduction, companyRoles, work, education, skills, others, aiExperience } from '@/shared/data/resume-data';
import { resumeCaseStudies } from '@/shared/data/resume-case-studies';
import { resume2OperationalDetails } from '@/shared/data/resume-operational-details';
import { PrintButton } from './print-button';
import { ResumePager } from './resume-pager';
import { TaskArchitecture } from './task-architecture';
import styles from './resume-viewer.module.css';


type Experience = Pick<(typeof work)[number], 'title' | 'period' | 'role' | 'points' | 'tech'> & { platform?: string };
const workPlatforms: Record<string, string> = {
  'branch-manager': '브랜치매니저',
  'e-contract': 'CMS+',
  sparrow: 'CMS+ · Connect',
  export: 'Connect',
  settlement: 'Connect',
  recovery: 'CMS+',
  integration: 'CMS+',
};
const ozReport: Experience = {
  platform: 'iBill',
  title: '라이선스 비용 절감을 위한 OZ Report 서버 이전',
  period: '2026.10',
  role: '사전 조사·이전 계획 수립·서비스 측 이전 수행 · 인프라 파트 주관',
  points: [
    '서버 코어 수에 따른 라이선스 비용 문제에 대응해 OZ Report를 코어 수가 적은 별도 서버로 이전했습니다.',
    '서버 구성도와 문서를 조사하고 인프라팀과 협업해 사용자 PC의 뷰어부터 내부 리포트 서버까지의 통신 경로와 이전 항목을 파악했습니다.',
    '이전 계획을 수립하고 리포트 서버 실행 파일·JDK 이전, Nginx와 인바운드·아웃바운드 포트 설정을 수행했습니다. 작업 순서와 진행은 인프라 파트가 조율했습니다.',
    '사전 검토 후 테스트·운영 환경 모두 한 번에 이전을 완료해 고객의 보고서 이용 기능을 유지하고 라이선스 이용료를 절감했습니다.',
  ],
  tech: 'OZ Report, JDK, Nginx, 네트워크 설정',
};
// resume2 표기: 공용 데이터의 용어를 resume2에서만 바꿔 보여 준다.
const resume2Terms: [string, string][] = [['Branch Manager', '브랜치매니저'], ['고객사', '고객'], ['조직 단계', '조직 계층'], ['현재 서비스 상태', '현재 고객 서비스 상태']];
const localize = (text: string) => resume2Terms.reduce((value, [from, to]) => value.replaceAll(from, to), text);
const localizeItem = <T extends Experience>(item: T): T => ({ ...item, title: localize(item.title), points: item.points.map(localize) });
// 1쪽 목차 제목은 본문 Task 제목을 그대로 사용한다.
const caseStudyTitles = resumeCaseStudies.map(content => content.match(/^# Task \d+\. (.+)$/m)?.[1] ?? '');
const operationalWork: Experience[] = [ozReport, ...['export', 'settlement', 'recovery', 'integration', 'sparrow'].map(id => ({ ...work.find(entry => entry.id === id)!, platform: workPlatforms[id] }))];

function Sheet({ title, children, runningTitle }: { title?: string; children: ReactNode; runningTitle: string }) {
  return <div className={`${styles.caseStudy} ${styles.overview}`}>
    <div className={styles.running} data-resume-running>{runningTitle} <span>SANGHUN KIM</span></div>
    {title && <h1>{title}</h1>}{children}
  </div>;
}
function Head({ title, period, enDash = false }: { title: string; period: string; enDash?: boolean }) {
  return <div className={styles.entryHeading}><h3>{title}</h3><span>{enDash ? period.replaceAll(' — ', ' – ') : period}</span></div>;
}
function WorkItem({ item, platform, enDash = false }: { item: Experience; platform?: string; enDash?: boolean }) {
  return <article className={styles.experience} data-resume-experience>
    <Head title={item.title} period={item.period} enDash={enDash} />
    <p className={styles.entryMeta}>{platform && <><span className={styles.platformName}>{platform}</span><span className={styles.metaDivider} aria-hidden='true' /></>}{item.role}</p>
    <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
    <p className={styles.entryMeta}>{platform ? item.tech : `사용 기술: ${item.tech}`}</p>
  </article>;
}
function OtherEntries({ kind, enDash = false }: { kind: string; enDash?: boolean }) {
  return <section className={styles.infoSection} data-resume-info-section><h2>{kind}</h2>
    {others.filter(item => item.kind === kind).map(item => <article key={item.title} className={styles.infoEntry} data-resume-info-entry>
      <Head title={item.title} period={item.period} enDash={enDash} /><p className={styles.subtle}>{item.org}</p>
      {item.lines.map(line => <p key={line}>{line}</p>)}
    </article>)}
  </section>;
}

function OtherTasks({ title }: { title?: string }) {
  return <section className={styles.infoSection} data-resume-other-tasks>{title && <h2>{title}</h2>}
    <div className={styles.trackRecord}>{trackRecord.filter(item => !item.title.startsWith('Sparrow SAST')).map(item =>
      <div key={`${item.period}-${item.title}`}><span>{item.period}</span><p>{item.title}</p><span>{item.service}</span></div>
    )}</div>
  </section>;
}

export default function ResumeDocument({ runningTitle = 'CAREER DESCRIPTION', variant = 'default' }: { runningTitle?: string; variant?: 'default' | 'resume2' }) {
  const revised = variant === 'resume2';
  const profileRoles = revised ? [
    { date: '2026.08 – 현재', title: 'iBill 오너', text: '교육비 수납 플랫폼의 요구사항 검토 및 과제 선정' },
    { date: '2025.10 – 현재', title: '플랫폼 운영', text: 'CMS+·iBill 운영 및 VoC 대응' },
    { date: '2024.09 – 현재', title: '플랫폼 개발', text: 'CMS+·Connect·Square·iBill의 백엔드·프론트엔드 개발 및 유지보수' },
  ] : companyRoles;
  const datedPeriod = (item: Experience) => item.period.match(/^\d{4}\.\d{2}/)?.[0] ?? '';
  const orderedWork = revised
    ? operationalWork.map(item => {
      const id = item === ozReport ? 'oz-report' : work.find(entry => entry.title === item.title)?.id;
      return { ...item, ...(id ? resume2OperationalDetails[id] : undefined) };
    }).sort((a, b) => datedPeriod(b).localeCompare(datedPeriod(a)))
    : operationalWork;
  const workPerPage = 3;
  const workPages = Array.from({ length: Math.ceil(orderedWork.length / workPerPage) }, (_, index) =>
    orderedWork.slice(index * workPerPage, (index + 1) * workPerPage));
  // 1쪽 + Task + 프로젝트 다음부터 주요 과제를 페이지별로 배치한다.
  const recoveryTitle = (revised && resume2OperationalDetails.recovery?.title) || work.find(entry => entry.id === 'recovery')!.title;
  const recoveryIndex = orderedWork.findIndex(item => item.title === recoveryTitle);
  const recoveryPage = 1 + resumeCaseStudies.length * 2 + 1 + 1 + Math.floor(recoveryIndex / workPerPage);
  return <div className='min-h-screen px-3 py-6 sm:px-6 sm:py-8 print:p-0 [word-break:keep-all]'>
    <div className='mx-auto mb-5 flex max-w-[794px] items-center justify-between print:hidden'>
      <Link href='/' className='inline-flex items-center gap-2 text-sm text-muted hover:text-accent'><ArrowLeft size={15} /> 포트폴리오</Link>
      <PrintButton />
    </div>
    <main id='main-content'><ResumePager>
      <Sheet runningTitle={runningTitle}>
        <header className={styles.profileHeader}>
          <div>
            <h1>{profile.name}</h1><p>{profile.role}</p>
            <div className={styles.contacts}>
              {revised && <a href='tel:+821026270378'>010-2627-0378</a>}
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.github}>{profile.githubLabel}</a>
              <a href='https://www.sanghunkim.com'>sanghunkim.com</a>
            </div>
          </div>
          <Image src={profilePhoto} alt='김상훈 증명사진' sizes='114px' className={styles.profilePhoto} loading='eager' />
        </header>
        <section className={styles.introduction} data-resume-introduction>
          {revised ? <>
            <div data-intro-body>{resume2Introduction.paragraphs.map(text => <p key={text}>{text}</p>)}</div>
          </> : summary.map(text => <p key={text}>{text}</p>)}
        </section>
        <section className={styles.infoSection}><h2>경력</h2>
          <Head title='효성에프엠에스' period={revised ? '2024.09 — 현재' : '2024.09 — 재직중'} enDash={revised} />
          <p className={styles.entryMeta}>개발팀 (Application Platform) · 선임 · 정규직</p>
          <div className={styles.roleHistory}>{profileRoles.map(item => <div key={item.date}>
            <span>{item.date}</span>
            {revised && 'title' in item ? <div data-resume-role>
              <strong>{item.title}</strong>
              <p>{item.text}</p>
            </div> : <p>{item.text}</p>}
          </div>)}</div>
        </section>
        <section className={styles.documentGuide} data-resume-guide><h2>{revised ? 'Task' : '주요 문제 해결 경험'}</h2>
          <div><span>01</span><p><strong>{caseStudyTitles[0]}</strong>{!revised && <><br />기존 자동화를 수개월 운영한 뒤 재실행·복구 구조 개선</>}</p></div>
          <div><span>02</span><p><strong>{caseStudyTitles[1]}</strong>{!revised && <><br />전 고객 조회를 필요한 변경 데이터 수신으로 전환</>}</p></div>
        </section>
      </Sheet>
      {resumeCaseStudies.flatMap((content, index) => {
        const detail = <div key={`task-${index}`} className={styles.caseStudy}>
          <div className={styles.running} data-resume-running>{runningTitle} <span>SANGHUN KIM</span></div>
          <ReactMarkdown>{revised && index === 0 ? content.replace('CMS 결제 요청 배치는 ', '_\*CMS 결제 요청 배치는 ').replace('보정하는 구조였습니다.', '보정하는 구조였습니다._') : content}</ReactMarkdown>
          {revised && index === 0 && <p data-resume-footnote>* {recoveryPage}p 주요 과제[{recoveryIndex + 1}] {localize(orderedWork[recoveryIndex].title)}</p>}
        </div>;
        return revised ? [detail,
          <Sheet key={`architecture-${index}`} runningTitle={runningTitle} title={`Task 0${index + 1}. ${caseStudyTitles[index]}`}>
            <TaskArchitecture task={index === 0 ? 1 : 2} />
          </Sheet>,
        ] : [detail];
      })}
      <Sheet runningTitle={runningTitle} title={revised ? '프로젝트' : '서비스 구축 경험'}>
        {['branch-manager', 'e-contract'].map(id => work.find(item => item.id === id)!).map(item => <WorkItem enDash={revised} key={item.id} item={revised ? localizeItem(item) : item} platform={revised ? workPlatforms[item.id] : undefined} />)}
      </Sheet>
      {workPages.map((items, pageIndex) => <Sheet key={`work-${pageIndex}`} runningTitle={runningTitle} title={revised ? '주요 과제' : '운영 및 개선 경험'}>
        <div className={styles.compact}>{items.map((item, index) => <WorkItem enDash={revised} key={item.title} item={revised ? { ...item, title: `[${pageIndex * workPerPage + index + 1}] ${localize(item.title)}` } : item} platform={revised ? item.platform : undefined} />)}</div>
      </Sheet>)}
      {revised && <Sheet runningTitle={runningTitle} title='그 외 과제'>
        <OtherTasks />
      </Sheet>}
      <Sheet runningTitle={runningTitle} title={revised ? '기타' : '기술 · 학력 · 수상'}>
        <section className={styles.infoSection} data-resume-info-section><h2>기술</h2><p>{skills.join(' · ')}</p></section>
        <section className={styles.infoSection} data-resume-info-section><h2>AI 활용 경험</h2>
          <Head title='암호화폐 퀀트 분석 대시보드' period='2026 · 개인 프로젝트' />
          <ul>{aiExperience.map(line => <li key={line}>{line}</li>)}</ul>
        </section>
        <section className={styles.infoSection} data-resume-info-section><h2>학력</h2>
          {education.map(item => <article key={item.title} className={styles.infoEntry} data-resume-info-entry>
            <Head title={item.title} period={item.period} enDash={revised} /><p className={styles.subtle}>{item.sub}</p>
            {item.lines.map(line => <p key={line}>{line}</p>)}
          </article>)}
        </section>
        <OtherEntries kind='수상' enDash={revised} />
      </Sheet>
      <Sheet runningTitle={runningTitle} title={revised ? '기타' : '자격 · 교육 · 담당 업무'}>
        <OtherEntries kind='자격증' enDash={revised} /><OtherEntries kind='교육' enDash={revised} />
        {!revised && <OtherTasks title='그 외 담당 업무' />}
      </Sheet>
    </ResumePager></main>
  </div>;
}
