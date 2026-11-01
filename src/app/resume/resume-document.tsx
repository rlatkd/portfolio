import { Fragment, type ReactNode } from 'react';
import Image from 'next/image';
import profilePhoto from '@public/images/resume/kim-sanghun-profile.webp';
import { DocumentShell, DocumentHeader } from '@/shared/ui/document-layout';
import ReactMarkdown from 'react-markdown';
import { profile, trackRecord } from '@/shared/data/site-data';
import { work, company, companyRoles } from '@/shared/data/career-data';
import { introduction, education, skills, others, aiExperience } from '@/shared/data/resume-data';
import { resumeCaseStudies } from '@/shared/data/resume-case-studies';
import { PrintButton } from './print-button';
import { PhoneLink } from './phone-link';
import { ResumePager } from './resume-pager';
import { TaskArchitecture } from './task-architecture';
import styles from './resume-viewer.module.css';

type WorkEntry = (typeof work)[number];
const runningTitle = 'RESUME';
const byId = (id: string) => work.find(entry => entry.id === id)!;
// 1쪽 목차 제목은 본문 Task 제목을 그대로 사용한다.
const caseStudyTitles = resumeCaseStudies.map(content => content.match(/^# Task \d+\. (.+)$/m)?.[1] ?? '');
const taskMeta = ['billing-persistence', 'eai-integration'].map(byId);
const projectWork = ['branch-manager', 'e-contract'].map(byId);
// 주요 과제: 최신순, 쪽당 3개
const datedPeriod = (item: WorkEntry) => item.period.match(/^\d{4}\.\d{2}/)?.[0] ?? '';
const mainWork = ['oz-report', 'export', 'settlement', 'recovery', 'integration', 'sparrow'].map(byId).sort((a, b) => datedPeriod(b).localeCompare(datedPeriod(a)));
const workPerPage = 3;
const workPages = Array.from({ length: Math.ceil(mainWork.length / workPerPage) }, (_, index) => mainWork.slice(index * workPerPage, (index + 1) * workPerPage));
// Task 01 각주가 가리키는 기존 보정 자동화 과제의 위치 (1쪽 + Task 2쪽씩 + 프로젝트 1쪽 다음)
const recoveryIndex = mainWork.findIndex(item => item.id === 'recovery');
const recoveryPage = 1 + resumeCaseStudies.length * 2 + 1 + 1 + Math.floor(recoveryIndex / workPerPage);

function Sheet({ title, children }: { title?: string; children: ReactNode }) {
  return <div className={`${styles.caseStudy} ${styles.overview}`}>
    <div className={styles.running} data-resume-running>{runningTitle} <span>SANGHUN KIM</span></div>
    {title && <h1>{title}</h1>}{children}
  </div>;
}
function Head({ title, period }: { title: ReactNode; period: string }) {
  const shown = period.replaceAll(' — ', ' – ');
  // 상태 표기 (재학중)·(졸업)은 고정 폭 칸에 넣어 위아래 항목의 날짜 위치를 맞춘다.
  const status = shown.match(/^(.*) (\([^)]+\))$/);
  return <div className={styles.entryHeading}><h3>{title}</h3><span>{status ? <>{status[1]} <span data-period-status>{status[2]}</span></> : shown}</span></div>;
}
function Meta({ items, last }: { items: string[]; last: string }) {
  return <p className={styles.entryMeta}>{items.map(item => <Fragment key={item}><span className={styles.platformName}>{item}</span><span className={styles.metaDivider} aria-hidden='true' /></Fragment>)}{last}</p>;
}
function WorkItem({ item, number }: { item: WorkEntry; number: number }) {
  return <article className={styles.experience} data-resume-experience>
    <Head title={`[${number}] ${item.title}`} period={item.period} />
    <Meta items={['효성에프엠에스', item.platform, item.team]} last={item.role} />
    <ul>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
    <p className={styles.entryMeta}>{item.tech.replace(/,\s*/g, ' · ')}</p>
  </article>;
}
function OtherEntries({ kind }: { kind: string }) {
  return <section className={styles.infoSection} data-resume-info-section><h2>{kind}</h2>
    {others.filter(item => item.kind === kind).map(item => {
      // 교육 시간은 제목에서 빼 기관명 앞에 표시한다.
      const hours = item.title.match(/ \((\d+)h\)$/);
      const org = hours ? `${hours[1]}시간 · ${item.org}` : 'code' in item && item.code ? `${item.code} · ${item.org}` : item.org;
      return <article key={item.title} className={styles.infoEntry} data-resume-info-entry>
        <Head title={hours ? item.title.replace(hours[0], '') : item.title} period={item.period.replace(/(\d{4}\.\d{2})\.\d{2}/g, '$1')} /><p className={styles.subtle}>{org}</p>
        {item.lines.map(line => <p key={line}>{line.split(/(github\.com\/[\w./-]+)/).map((part, index) =>
          index % 2 ? <a key={part} href={`https://${part}`}>{part}</a> : part)}</p>)}
      </article>;
    })}
  </section>;
}
function OtherTasks() {
  return <section className={styles.infoSection} data-resume-other-tasks>
    <div className={styles.trackRecord}>{trackRecord.filter(item => !item.title.startsWith('Sparrow SAST')).map(item =>
      <div key={`${item.period}-${item.title}`}><span>{item.period}</span><p>{item.title}</p><span>{item.service}</span></div>
    )}</div>
  </section>;
}

export default function ResumeDocument() {
  return <DocumentShell className='[word-break:keep-all]'>
    <DocumentHeader><PrintButton /></DocumentHeader>
    <main id='main-content'><ResumePager>
      <Sheet>
        <header className={styles.profileHeader}>
          <div>
            <h1>{profile.name}</h1><p>{profile.role}</p>
            <div className={styles.contacts}>
              <PhoneLink />
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
              <a href={profile.github}>{profile.githubLabel}</a>
              <a href='https://www.sanghunkim.com'>sanghunkim.com</a>
            </div>
          </div>
          <Image src={profilePhoto} alt='김상훈 증명사진' sizes='114px' className={styles.profilePhoto} loading='eager' />
        </header>
        <section className={styles.introduction} data-resume-introduction>
          <div data-intro-body>{introduction.map(text => <p key={text}>{text}</p>)}</div>
        </section>
        <section className={styles.infoSection}><h2>경력</h2>
          <Head title={company.name} period={`${company.period} — 현재 (재직중)`} />
          <p className={styles.entryMeta}>{company.position}</p>
          <div className={styles.roleHistory}>{companyRoles.map(item => <div key={item.date}>
            <span>{`${item.date} – 현재`}</span>
            <div data-resume-role><strong>{item.title}</strong><p>{item.text}</p></div>
          </div>)}</div>
        </section>
        <section className={styles.documentGuide} data-resume-guide><h2>Task</h2>
          {caseStudyTitles.map((title, index) => <div key={title}><span>{`0${index + 1}`}</span><p><strong>{title}</strong></p></div>)}
        </section>
      </Sheet>
      {resumeCaseStudies.flatMap((content, index) => [
        <div key={`task-${index}`} className={`${styles.caseStudy} ${styles.overview}`} data-resume-task-detail>
          <div className={styles.running} data-resume-running>{runningTitle} <span>SANGHUN KIM</span></div>
          <h1>{`Task 0${index + 1}. ${caseStudyTitles[index]}`}</h1>
          <div data-resume-task-meta><p className={styles.entryMeta}>효성에프엠에스<span className={styles.metaDivider} aria-hidden='true' />{taskMeta[index].platform}<span className={styles.metaDivider} aria-hidden='true' />{taskMeta[index].team}<span className={styles.metaDivider} aria-hidden='true' />{taskMeta[index].role}</p><span>{taskMeta[index].period}</span></div>
          <p className={styles.entryMeta}>{taskMeta[index].tech.replace(/,\s*/g, ' · ')}</p>
          <ReactMarkdown>{index === 0 ? content.slice(content.indexOf('## Problem')).replace('계좌 결제 요청 배치는 ', '*계좌 결제 요청 배치는 ') : content.slice(content.indexOf('## Problem'))}</ReactMarkdown>
          {index === 0 && <p data-resume-footnote><em>* {recoveryPage}p 주요 과제[{recoveryIndex + 1}] {mainWork[recoveryIndex].title}</em></p>}
        </div>,
        <Sheet key={`architecture-${index}`} title={`Task 0${index + 1}. ${caseStudyTitles[index]}`}>
          <TaskArchitecture task={index === 0 ? 1 : 2} />
        </Sheet>,
      ])}
      <Sheet title='프로젝트'>
        {projectWork.map((item, index) => <WorkItem key={item.id} item={item} number={index + 1} />)}
      </Sheet>
      {workPages.map((items, pageIndex) => <Sheet key={`work-${pageIndex}`} title='주요 과제'>
        <div className={styles.compact}>{items.map((item, index) => <WorkItem key={item.id} item={item} number={pageIndex * workPerPage + index + 1} />)}</div>
      </Sheet>)}
      <Sheet title='그 외 과제'>
        <OtherTasks />
      </Sheet>
      <Sheet title='기타'>
        <section className={styles.infoSection} data-resume-info-section><h2>AI 활용 경험</h2>
          <Head title={<>암호화폐 퀀트 분석 대시보드<a href='https://github.com/rlatkd/up-quant' data-resume-heading-link>github.com/rlatkd/up-quant</a></>} period='2026.05 — 2026.07' />
          <Meta items={['사이드 프로젝트', '성균관대학교', '1인']} last='백엔드·프론트엔드 개발 · 데이터 분석 · 머신러닝 · 계량경제 분석' />
          <ul>{aiExperience.map(line => <li key={line}>{line}</li>)}</ul>
        </section>
        <section className={styles.infoSection} data-resume-info-section>
          <h2 data-resume-skills-heading>기술 스택<span>* <strong><em>실무</em></strong></span></h2>
          <div data-resume-skills>{skills.map(group => <div key={group.label}>
            <span>{group.label}</span>
            <p>{[...group.items].sort((a, b) => Number(Boolean(b.work)) - Number(Boolean(a.work)) || a.name.localeCompare(b.name, 'en', { sensitivity: 'base' })).map((item, index) => <Fragment key={item.name}>{index > 0 && ' · '}{item.work ? <strong>{item.name}</strong> : item.name}</Fragment>)}</p>
          </div>)}</div>
        </section>
      </Sheet>
      <Sheet title='기타'>
        <section className={styles.infoSection} data-resume-info-section><h2>학력</h2>
          {education.map(item => <article key={item.title} className={styles.infoEntry} data-resume-info-entry>
            <Head title={item.title} period={item.period} /><p className={styles.subtle}>{item.sub}</p>
            {item.lines.map(line => {
              // 논문 제목만 기울임체로 표시한다.
              const thesis = line.match(/^(Thesis - )(.+?)( \(\d{4}\))?$/);
              return <p key={line}>{thesis ? <>{thesis[1]}<em>{thesis[2]}</em>{thesis[3]}</> : line}</p>;
            })}
          </article>)}
        </section>
        <OtherEntries kind='교육' /><OtherEntries kind='수상' /><OtherEntries kind='자격증' />
      </Sheet>
    </ResumePager></main>
  </DocumentShell>;
}
