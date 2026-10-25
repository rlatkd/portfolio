import { Section, Tags, Row } from '@/shared/ui/Section';
import { experience, strengths, jobRoles } from '@/shared/data/site-data';

type WorkItem = { key: string; date: string; outcome: string; title: string; summary: string };

// 회사 1줄 + 결과·제목·요약 목록 (최신순). 세부 내용은 이력서(/resume)에서 제공
const workItems: WorkItem[] = [
  {
    key: 'sparrow',
    date: '2026.09',
    outcome: '정적 분석 취약점 조치',
    title: 'Sparrow SAST 정적 분석 기반 보안 취약점 대응',
    summary: '탐지 항목별 데이터 흐름과 처리 로직 추적 · 기존 기능 영향 범위를 확인해 코드 수정 · 재분석과 동작 확인으로 조치 검증',
  },
  {
    key: 'branch-manager',
    date: '2026.05',
    outcome: '결제·정산 도메인 담당',
    title: '신규 프로젝트 브랜치매니저 플랫폼 구축',
    summary: '대형 유통기업 전용 B2B 플랫폼 신규 구축 참여 · 다섯 도메인 중 결제·정산 채널 개발',
  },
  ...strengths.map((s) => ({
    key: s.title,
    date: s.detail.period?.slice(0, 7) ?? '',
    outcome: s.outcome,
    title: s.title,
    summary: s.detail.summary ?? '',
  })),
  {
    key: 'e-contract',
    date: '2024.09',
    outcome: '누적 20건 → 5,000건',
    title: '신규 프로젝트 전자계약 서비스 개발',
    summary: 'CMS+ 비대면 계약 체결 경로 신규 구축 참여 · 서명 완료부터 자동이체 등록까지 연동 흐름 구현',
  },
].sort((a, b) => b.date.localeCompare(a.date));

export default function Experience() {
  const job = experience.find((e) => e.id === 'hyosung-fms');
  if (!job) return null;

  return (
    <Section id='experience' label='Experience'>
      <Row aside={job.period}>
        <h3 className='font-medium leading-snug text-fg-strong'>{job.role}</h3>
        <p className='mt-0.5 text-xs text-muted'>{job.org}</p>
        {jobRoles.map((r) => (
          <p key={r.period} className='mt-0.5 text-xs text-muted'>
            <span className='text-fg'>{r.text.split(' · ')[0]}</span> · {r.period} {r.text.split(' · ').slice(1).join(' · ')}
          </p>
        ))}
        <p className='mt-2.5 text-[13px] leading-[1.9]'>{job.desc}</p>
        <Tags items={job.tags} />
      </Row>

      <ol className='mt-8'>
        {workItems.map((w) => (
          <li key={w.key} className='border-t border-line py-5'>
            <Row aside={<span className='font-medium text-accent'>{w.outcome}</span>}>
              <h3 className='font-medium leading-snug text-fg-strong'>{w.title}</h3>
              <p className='mt-1 text-[13px] leading-[1.8]'>{w.summary}</p>
            </Row>
          </li>
        ))}
      </ol>
    </Section>
  );
}
