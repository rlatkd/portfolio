import { PaneTabs } from '@/shared/ui/pane-tabs';
import { company, companyRoles } from '@/shared/data/career-data';
import { education } from '@/shared/data/resume-data';
import { majorSkills } from '@/shared/data/site-data';

// 회사 정보는 이력서 1쪽 경력 칸과 같은 데이터·구성(회사·기간·직함·역할 3줄)으로 보여 준다.
// 프로젝트와 주요 과제는 아래 tasks 영역(widgets/tasks)에 있다.
// tasks처럼 머리를 `경력 / 학력 / 기술` 탭으로 나눈다. 학력은 이력서와 같은 데이터(resume-data.ts education)를 쓴다.
const career = (
  <>
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
  </>
);

const school = (
  <dl className='grid gap-y-3 sm:grid-cols-[auto_auto_1fr] sm:gap-x-4'>
    {education.map((e) => (
      <div key={e.title} className='grid sm:contents'>
        <dt className='font-code text-[13px] tabular-nums text-muted'>{e.period.replaceAll(' — ', ' – ')}</dt>
        <dd className='font-semibold text-fg-strong'>{e.title}</dd>
        <dd>{e.sub}</dd>
      </div>
    ))}
  </dl>
);

// 기술 탭은 분야 이름 + 칩(사이드 프로젝트 기술 칩과 같은 모양)
const tech = (
  <dl className='grid gap-y-3 sm:grid-cols-[auto_1fr] sm:gap-x-6'>
    {majorSkills.map((group) => (
      <div key={group.label} className='grid gap-y-1.5 sm:contents'>
        <dt className='pt-0.5 font-code text-[13px] text-muted'>{group.label}</dt>
        <dd className='flex flex-wrap gap-2'>
          {group.items.map((item) => (
            <span key={item} className='rounded-md border border-line px-2 py-0.5 font-code text-[12px] text-chip'>{item}</span>
          ))}
        </dd>
      </div>
    ))}
  </dl>
);

export default function Experience() {
  return (
    <PaneTabs
      id='experience'
      name='experience'
      ariaLabel='경력 · 학력 · 기술'
      tabs={[
        { key: 'career', label: '경력', content: career },
        { key: 'education', label: '학력', content: school },
        { key: 'tech', label: '기술', content: tech },
      ]}
    />
  );
}
