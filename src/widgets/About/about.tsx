import { Section } from '@/shared/ui/Section';
import { aboutIntro, aboutQuote, stats, careerStart, education, training, awards, certifications } from '@/shared/data/site-data';

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
  const allStats = [{ value: careerDuration(), label: '경력' }, ...stats];

  return (
    <Section id='about' label='About' className='!pt-0'>
      {/* 인용 (최상단) */}
      <blockquote className='mb-8 rounded-lg border border-line bg-surface p-6'>
        <p className='whitespace-pre-line border-l-2 border-accent pl-4 italic leading-relaxed text-fg'>
          “{aboutQuote.text}”
        </p>
      </blockquote>

      <div className='space-y-4'>
        {aboutIntro.map((p, i) => (
          <p key={i} className='leading-relaxed text-fg'>
            {p}
          </p>
        ))}
      </div>

      {/* 통계 */}
      <div className='mt-8 grid grid-cols-2 gap-3 md:grid-cols-4'>
        {allStats.map((s) => (
          <div key={s.label} className='rounded-lg border border-line bg-surface p-5'>
            <div className='whitespace-nowrap text-lg font-bold tracking-tight text-accent md:text-xl'>
              {s.value}
            </div>
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
          <div className='mb-3 text-xs uppercase tracking-[0.2em] text-muted'>Training</div>
          <div className='space-y-4'>
            {training.map((t) => (
              <div key={t.title}>
                <div className='text-xs text-accent'>{t.period}</div>
                <div className='mt-0.5 font-medium text-fg-strong'>
                  {t.title} ({t.hours})
                </div>
                <div className='text-sm text-muted'>{t.org}</div>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-lg border border-line bg-surface p-6'>
          <div className='mb-3 text-xs uppercase tracking-[0.2em] text-muted'>Awards</div>
          <div className='space-y-3'>
            {awards.map((a) => (
              <div key={`${a.date}-${a.org}-${a.title}`}>
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
          <div className='space-y-3'>
            {certifications.map((c) => (
              <div key={c.name} className='flex items-start justify-between gap-3'>
                <div>
                  <div className='text-sm font-medium text-fg-strong'>{c.name}</div>
                  <div className='text-xs text-muted'>
                    {c.date} · {c.org}
                  </div>
                </div>
                <div className='shrink-0 pt-0.5 font-mono text-xs text-muted'>{c.id}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
