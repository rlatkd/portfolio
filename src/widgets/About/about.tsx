import { Section } from '@/shared/ui/Section';
import { aboutIntro, aboutQuote, careerServices, careerProjects, careerStart, education, training, awards, certifications, skillGroups } from '@/shared/data/site-data';

// 실무(효성에프엠에스)에서 사용한 기술
const proSkills = new Set([
  'Java',
  'JavaScript',
  'Spring Boot',
  'Spring Batch',
  'Spring Data JPA',
  'Spring Security',
  'Vue.js',
  'Oracle',
  'Bamboo',
  'Bitbucket',
  'Jira',
  'Confluence',
]);

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

      {/* 경력 / 담당 서비스 / 실무 프로젝트 (3열) */}
      <div className='mt-8 grid grid-cols-3 gap-3'>
        {/* 경력 */}
        <div className='rounded-lg border border-line bg-surface p-4 sm:p-5'>
          <div className='mb-3 text-xs uppercase tracking-[0.2em] text-muted'>경력</div>
          <div className='text-xl font-bold tracking-tight text-accent md:text-2xl'>
            {careerDuration()}
          </div>
          <div className='mt-1.5 text-xs font-semibold text-fg-strong'>Fullstack Developer</div>
          <div className='mt-1 text-xs leading-relaxed text-muted'>
            효성에프엠에스
            <br />
            2024.09 ~ 현재
          </div>
        </div>

        {/* 담당 서비스 */}
        <div className='rounded-lg border border-line bg-surface p-4 sm:p-5'>
          <div className='mb-3 flex items-baseline gap-2'>
            <span className='text-xs uppercase tracking-[0.2em] text-muted'>서비스</span>
            <span className='font-mono text-xs text-accent'>{careerServices.length}</span>
          </div>
          <ul className='space-y-2.5'>
            {careerServices.map((s) => (
              <li key={s.name}>
                <div className='text-sm font-semibold leading-snug text-fg-strong'>{s.name}</div>
                <div className='mt-0.5 text-xs leading-snug text-muted'>{s.kind}</div>
              </li>
            ))}
          </ul>
        </div>

        {/* 실무 프로젝트 */}
        <div className='rounded-lg border border-line bg-surface p-4 sm:p-5'>
          <div className='mb-3 flex items-baseline gap-2'>
            <span className='text-xs uppercase tracking-[0.2em] text-muted'>프로젝트</span>
            <span className='font-mono text-xs text-accent'>{careerProjects.length}</span>
          </div>
          <ul className='space-y-2.5'>
            {careerProjects.map((p) => (
              <li key={p.name}>
                <div className='text-sm font-semibold leading-snug text-fg-strong'>{p.name}</div>
                <div className='mt-0.5 text-xs leading-snug text-muted'>{p.kind}</div>
              </li>
            ))}
          </ul>
        </div>
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
              <div key={c.id}>
                <div className='text-sm font-medium text-fg-strong'>{c.name}</div>
                <div className='text-xs text-muted'>
                  {c.date} · {c.org} · <span className='font-mono'>{c.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className='rounded-lg border border-line bg-surface p-6'>
          <div className='mb-3 flex flex-wrap items-center gap-x-3 gap-y-1'>
            <span className='text-xs uppercase tracking-[0.2em] text-muted'>Skills</span>
            <span className='inline-flex items-center gap-1.5 text-xs text-muted'>
              <span className='inline-block h-2 w-2 rounded-full bg-accent' aria-hidden />
              실무
            </span>
          </div>
          <div>
            {skillGroups.map((g) => (
              <div
                key={g.label}
                className='grid grid-cols-1 gap-1 border-b border-line py-3 first:pt-0 last:border-b-0 last:pb-0 sm:grid-cols-[140px_1fr] sm:gap-4'
              >
                <div className='whitespace-nowrap pt-0.5 font-mono text-xs uppercase tracking-[0.08em] text-accent'>
                  {g.label}
                </div>
                <div className='text-sm leading-relaxed text-muted'>
                  {g.items.map((item, i) => (
                    <span key={item}>
                      {i > 0 && <span className='text-line'>{'  ·  '}</span>}
                      <span className={proSkills.has(item) ? 'font-semibold text-accent' : ''}>
                        {item}
                      </span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
