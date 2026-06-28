import { Section } from '@/shared/ui/Section';
import { aboutIntro, aboutQuote, stats, careerStart, education, awards, certifications } from '@/shared/data/site-data';

function careerDuration() {
  const start = new Date(careerStart);
  const now = new Date();
  const months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y > 0) return m > 0 ? `${y}년 ${m}개월` : `${y}년`;
  return `${m}개월`;
}

export default function About() {
  const allStats = [{ value: careerDuration(), label: '실무 경력' }, ...stats];

  return (
    <Section id='about'>
      <div className='space-y-4'>
        {aboutIntro.map((p, i) => (
          <p key={i} className='leading-relaxed text-fg'>
            {p}
          </p>
        ))}
      </div>

      {/* 인용 */}
      <blockquote className='mt-8 rounded-lg border border-line bg-surface p-6'>
        <p className='border-l-2 border-accent pl-4 italic leading-relaxed text-fg'>
          “{aboutQuote.text}”
        </p>
      </blockquote>

      {/* 통계 */}
      <div className='mt-8 grid grid-cols-2 gap-3 md:grid-cols-4'>
        {allStats.map((s) => (
          <div key={s.label} className='rounded-lg border border-line bg-surface p-5'>
            <div className='text-2xl font-bold text-accent'>{s.value}</div>
            <div className='mt-1 text-xs leading-snug text-muted'>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Education / Awards / Certifications (단일 컬럼 나열) */}
      <div className='mt-4 space-y-4'>
        <div className='rounded-lg border border-line bg-surface p-6'>
          <div className='mb-3 text-xs uppercase tracking-[0.2em] text-muted'>Education</div>
          <div className='space-y-4'>
            {education.map((e) => (
              <div key={e.org}>
                <div className='text-xs text-accent'>{e.period}</div>
                <div className='mt-0.5 font-medium text-fg-strong'>{e.org}</div>
                <div className='text-sm text-muted'>{e.detail}</div>
                {e.note && <div className='mt-1 text-xs italic leading-relaxed text-muted'>{e.note}</div>}
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-lg border border-line bg-surface p-6'>
          <div className='mb-3 text-xs uppercase tracking-[0.2em] text-muted'>Awards</div>
          <div className='space-y-3'>
            {awards.map((a) => (
              <div key={a.title}>
                <div className='text-sm font-medium text-fg-strong'>{a.title}</div>
                <div className='text-xs text-muted'>
                  {a.date} · {a.org}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-lg border border-line bg-surface p-6'>
          <div className='mb-3 text-xs uppercase tracking-[0.2em] text-muted'>Certifications</div>
          <div className='flex flex-wrap gap-2'>
            {certifications.map((c) => (
              <span
                key={c}
                className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent'
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
