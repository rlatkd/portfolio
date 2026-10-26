import { Section, Tags, Row } from '@/shared/ui/Section';
import { experience, jobRoles } from '@/shared/data/site-data';

import { work } from '@/shared/data/career-data';

const workItems = work.map(item => ({ key: item.id, date: item.period, ...item.main }));

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
