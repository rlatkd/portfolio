import { Section } from '@/shared/ui/Section';
import { experience } from '@/shared/data/site-data';

export default function Experience() {
  return (
    <Section id='experience' label='Experience'>
      <div className='space-y-10'>
        {experience.map((job) => (
          <div key={job.role} className='flex flex-col gap-2 sm:flex-row sm:gap-6'>
            <div className='shrink-0 pt-1 text-xs text-muted sm:w-32'>{job.period}</div>
            <div className='flex-1'>
              <h3 className='font-bold text-fg-strong'>{job.role}</h3>
              <div className='mt-0.5 text-sm text-muted'>{job.org}</div>
              <p className='mt-3 text-sm leading-relaxed text-fg'>{job.desc}</p>

              {job.points.length > 0 && (
                <ul className='mt-3 space-y-1.5'>
                  {job.points.map((p) => (
                    <li key={p} className='flex gap-2 text-sm leading-relaxed text-muted'>
                      <span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-accent' />
                      {p}
                    </li>
                  ))}
                </ul>
              )}

              {job.tags.length > 0 && (
                <div className='mt-4 flex flex-wrap gap-2'>
                  {job.tags.map((t) => (
                    <span
                      key={t}
                      className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent'
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
