import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { projects } from '@/shared/data/site-data';

// Claude 브랜드 마크(선버스트) — 사이트 팔레트가 아닌 Claude 코럴을 의도적으로 사용
function ClaudeMark({ size = 12 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => (
        <line
          key={i}
          x1='12'
          y1='3'
          x2='12'
          y2='9'
          stroke='currentColor'
          strokeWidth='2.2'
          strokeLinecap='round'
          transform={`rotate(${i * 30} 12 12)`}
        />
      ))}
    </svg>
  );
}

export default function Projects() {
  return (
    <Section id='projects' label='Side Projects'>
      <div className='space-y-5'>
        {projects.map((p) => {
          const Wrapper = p.href ? 'a' : 'div';
          return (
            <Wrapper
              key={p.title}
              {...(p.href ? { href: p.href, target: '_blank', rel: 'noopener noreferrer' } : {})}
              className='group block rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent'
            >
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <h3 className='font-bold text-fg-strong group-hover:text-accent'>
                    {p.title}
                    {p.href && (
                      <ArrowUpRight
                        size={16}
                        className='ml-1 inline-block transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
                      />
                    )}
                  </h3>
                  <div className='mt-0.5 text-xs text-muted'>{p.context}</div>
                </div>
                {p.badge && (
                  <span className='inline-flex shrink-0 items-center gap-1 rounded-full border border-[#D97757] bg-[#D97757]/10 px-2.5 py-1 text-xs font-semibold text-[#D97757]'>
                    <ClaudeMark size={12} />
                    {p.badge}
                  </span>
                )}
              </div>

              <ul className='mt-3 space-y-1.5'>
                {p.points.map((pt) => (
                  <li key={pt} className='flex gap-2 text-sm leading-relaxed text-muted'>
                    <span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-accent' />
                    {pt}
                  </li>
                ))}
              </ul>

              {p.image && (
                <div className='mt-5 overflow-hidden rounded-md border border-line'>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.image}
                    alt={`${p.title} 메인 화면`}
                    loading='lazy'
                    className={`block w-full bg-white ${
                      p.imageFit === 'contain'
                        ? 'h-80 object-contain pb-2 pt-10'
                        : 'max-h-80 object-cover object-top'
                    }`}
                  />
                </div>
              )}

              <div className='mt-4 flex flex-wrap gap-2'>
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent'
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Wrapper>
          );
        })}
      </div>
    </Section>
  );
}
