import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { projectResources } from '@/shared/data/project-resources';
import { projects } from '@/shared/data/site-data';

const imageSizes: Record<string, [number, number]> = {
  '/images/up-quant/preview.png': [2880, 4430],
  '/images/portfolio/preview.png': [1127, 1265],
  '/images/cms-plus/preview.jpg': [2560, 1400],
  '/images/sale-sync/preview.png': [326, 200],
  '/images/liver-tumor-cnn/preview.png': [1400, 2100],
  '/images/ct-image-reconstruction/preview.png': [364, 369],
};

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
      <p className='mb-5 text-sm text-muted'>프로젝트별 코드와 실행 문서, 결과 이미지를 확인할 수 있습니다. <a href='/evidence' className='text-accent underline'>성능 수치의 근거와 확인 범위</a></p>
      <div className='space-y-5'>
        {projects.map((p) => {
          const resource = p.href ? projectResources[p.href] : undefined;
          return (
            <article
              key={p.title}
              className='group block rounded-lg border border-line bg-surface p-6 transition-colors hover:border-accent'
            >
              <div className='flex items-start justify-between gap-3'>
                <div>
                  <h3 className='font-bold text-fg-strong group-hover:text-accent'>
                    {p.href ? <a href={p.href} target='_blank' rel='noopener noreferrer'>{p.title}</a> : p.title}
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
                {/* overflow-wrap:anywhere — ·/→로 이어진 긴 토큰이 좁은 화면에서 안 끊겨 넘치는 것 방지 */}
                {p.points.map((pt) => (
                  <li key={pt} className='flex gap-2 text-sm leading-relaxed text-muted [overflow-wrap:anywhere]'>
                    <span className='mt-2 h-1 w-1 shrink-0 rounded-full bg-accent' />
                    {pt}
                  </li>
                ))}
              </ul>

              {p.image && (
                <div className='mt-5 overflow-hidden rounded-md border border-line'>

                  <Image
                    src={p.image}
                    alt={`${p.title} 프로젝트 결과 미리보기`}
                    loading='lazy'
                    width={imageSizes[p.image]?.[0] || 1200}
                    height={imageSizes[p.image]?.[1] || 800}
                    sizes='(min-width: 1024px) 480px, (min-width: 768px) 90vw, 100vw'
                    className={`block w-full bg-white ${
                      p.imageFit === 'contain'
                        ? 'h-80 object-contain pb-2 pt-10'
                        : 'max-h-80 object-cover object-top'
                    }`}
                  />
                </div>
              )}

              <div className='mt-4 flex flex-wrap gap-4 text-sm text-accent'>
                {p.href && <>
                <a href={p.href} target='_blank' rel='noopener noreferrer' className='underline'>소스 코드 <span className='sr-only'>{p.title}</span></a>
                <a href={`${p.href}#readme`} target='_blank' rel='noopener noreferrer' className='underline'>설계 · 실행 문서 <span className='sr-only'>{p.title}</span></a>
                </>}
                {resource?.demo && <a href={resource.demo.href} target={resource.demo.href.startsWith('https:') ? '_blank' : undefined} rel='noopener noreferrer' className='underline'>{resource.demo.label} <span className='sr-only'>{p.title}</span></a>}
                {resource?.architecture && <a href={resource.architecture} target='_blank' rel='noopener noreferrer' className='underline'>시스템 구조도 <span className='sr-only'>{p.title}</span></a>}
                {p.image && <a href={p.image} target='_blank' rel='noopener noreferrer' className='underline'>결과 이미지 <span className='sr-only'>{p.title}</span></a>}
              </div>
              {resource?.note && <p className='mt-3 text-xs text-muted'>{resource.note}</p>}
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
            </article>
          );
        })}
      </div>
    </Section>
  );
}
