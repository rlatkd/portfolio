import { Section } from '@/shared/ui/Section';
import { strengths, trackRecord } from '@/shared/data/site-data';

export default function Strengths() {

  return (
    <Section id='strengths' label='Strengths'>
      <div className='grid grid-cols-1 gap-4'>
        {strengths.map((s) => {
          return (
          <div
            key={s.title}
            className='flex h-full flex-col rounded-lg border border-line bg-surface p-6 text-left'
          >
            <div className='flex items-start justify-between gap-3'>
              <h3 className='font-bold leading-snug text-fg-strong'>
                {s.title}
              </h3>
            </div>
            <ul className='mt-2 flex-1 space-y-1.5'>
              {s.points
                .flatMap((p) => p.split(/(?<=\.)\s+/))
                .map((line, i) => (
                  <li key={i} className='flex gap-2 text-sm leading-relaxed text-muted'>
                    <span aria-hidden className='shrink-0 text-lg leading-[1.42rem] text-accent'>
                      ·
                    </span>
                    <span>{line.replace(/\.$/, '')}</span>
                  </li>
                ))}
            </ul>
            <ul className='mt-5 space-y-1 border-t border-line pt-4'>
              {s.result.map((r, i) => (
                <li key={i} className='text-sm font-medium leading-relaxed text-fg-strong'>
                  {r}
                </li>
              ))}
            </ul>
            <div className='mt-4 flex flex-wrap gap-2'>
              {s.tags.map((t) => (
                <span
                  key={t}
                  className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent'
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
          );
        })}
      </div>

      <div className='mt-10 border-t border-line pt-8'>
        <div className='mb-4 flex items-baseline gap-3'>
          <h3 className='font-mono text-xs uppercase tracking-[0.2em] text-accent'>Track Record</h3>
          <span className='text-xs text-muted'>그 외 담당 과제 {trackRecord.length}건</span>
        </div>
        <ul>
          {trackRecord.map((t, i) => (
            <li
              key={i}
              className='flex flex-col gap-1 border-b border-line py-2.5 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-4'
            >
              <span className='shrink-0 font-mono text-xs text-accent sm:w-[68px]'>{t.period}</span>
              <span className='flex-1 text-sm leading-snug text-fg'>{t.title}</span>
              <span className='shrink-0 font-mono text-[11px] text-muted'>{t.service}</span>
            </li>
          ))}
        </ul>
      </div>

    </Section>
  );
}
