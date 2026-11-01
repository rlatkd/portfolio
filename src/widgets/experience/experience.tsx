import { Pane } from '@/shared/ui/pane';
import { company, companyRoles } from '@/shared/data/career-data';

// 2026-11-01: 회사 정보는 이력서 1쪽 경력 칸과 같은 데이터·구성(회사·기간·직함·역할 3줄)으로 보여 준다.
// 프로젝트와 주요 과제는 아래 tasks 영역(widgets/tasks)으로 옮겼다.
export default function Experience() {
  return (
    <Pane id='experience' file='experience.md'>
      <p className='flex flex-wrap items-baseline justify-between gap-x-3'>
        <span className='text-lg font-semibold text-fg-strong'>{company.name}</span>
        <span className='font-code text-[13px] tabular-nums text-muted'>{company.period} – 현재 (재직중)</span>
      </p>
      <p className='mt-2'>{company.position}</p>
      {/* 세 줄이 한 격자를 공유해 날짜 · 역할명 · 설명의 시작 위치를 맞춘다. */}
      <dl className='mt-4 grid gap-y-3 sm:grid-cols-[auto_auto_1fr] sm:gap-x-4'>
        {companyRoles.map((r) => (
          <div key={r.date} className='grid sm:contents'>
            <dt className='font-code text-[13px] tabular-nums text-muted'>{r.date} – 현재</dt>
            <dd className='font-semibold text-fg-strong'>{r.title}</dd>
            <dd>{r.text}</dd>
          </div>
        ))}
      </dl>
    </Pane>
  );
}
