import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { projects } from '@/shared/data/site-data';

export default function Projects() {
  return (
    <Section id='projects' label='Projects'>
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
                    className='block max-h-80 w-full bg-white object-cover object-top'
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
