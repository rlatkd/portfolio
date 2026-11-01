import { Section, Tags, Row } from '@/shared/ui/section';
import { Collapsible } from '@/shared/ui/collapsible';
import { experience } from '@/shared/data/site-data';

import { work, company, companyRoles } from '@/shared/data/career-data';

// 프로젝트는 항상 표시하고 주요 과제만 접고 펼친다. Task 01·02는 주요 과제 맨 위에 둔다.
const toItem = (item: (typeof work)[number]) => ({ key: item.id, ...item.main });
const projectIds = ['branch-manager', 'e-contract'];
const groups = [
  { label: '프로젝트', items: work.filter(item => projectIds.includes(item.id)).map(toItem) },
  { label: '주요 과제', items: work.filter(item => !projectIds.includes(item.id)).map(toItem) },
];

export default function Experience() {
  const job = experience.find((e) => e.id === 'hyosung-fms');
  if (!job) return null;

  return (
    <Section id='experience' label='Experience'>
      {/* 2026-11-01: 회사 정보는 이력서 1쪽 경력 칸과 같은 데이터·구성(회사·기간·직함·역할 3줄)으로 보여 준다 */}
      <Row aside={`${company.period} – 현재 (재직중)`}>
        <h3 className='font-medium leading-snug text-fg-strong'>{company.name}</h3>
        <p className='mt-0.5 text-xs text-muted'>{company.position}</p>
        <dl className='mt-3 space-y-2'>
          {companyRoles.map((r) => (
            <div key={r.date} className='grid grid-cols-[6.5rem_1fr] gap-x-3 text-xs'>
              <dt className='tabular-nums text-muted'>{r.date} – 현재</dt>
              <dd>
                <span className='font-medium text-fg-strong'>{r.title}</span>
                <span className='mt-0.5 block text-muted'>{r.text}</span>
              </dd>
            </div>
          ))}
        </dl>
        <Tags items={job.tags} />
      </Row>

      <div className='mt-8'>
        {groups.map((group) => {
          const entries = <ol>
              {group.items.map((w) => (
                <li key={w.key} className='border-t border-line py-5 first:border-t-0'>
                  <Row aside={<span className='font-medium text-accent'>{w.outcome}</span>}>
                    <h3 className='font-medium leading-snug text-fg-strong'>{w.title}</h3>
                    <ul className='mt-1 text-[13px] leading-[1.8]'>
                      {w.how.map(line => <li key={line}>· {line}</li>)}
                      <li className='font-medium text-accent'>· {w.kpi}</li>
                    </ul>
                  </Row>
                </li>
              ))}
            </ol>;
          return group.label === '프로젝트' ? (
            <div key={group.label} className='border-t border-line'>
              <h3 className='py-4 text-sm font-medium text-fg-strong'>
                {group.label}<span className='ml-1 text-xs font-normal text-muted'>{group.items.length}</span>
              </h3>
              {entries}
            </div>
          ) : (
            <Collapsible key={group.label} label={group.label} count={group.items.length}>
              {entries}
            </Collapsible>
          );
        })}
      </div>
    </Section>
  );
}
