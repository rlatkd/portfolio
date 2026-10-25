import { Section } from '@/shared/ui/Section';
import { aboutIntro, aboutKeyTerms } from '@/shared/data/site-data';

// 문단 안의 고유명사만 진하게
function emphasize(text: string) {
  const pattern = new RegExp(`(${aboutKeyTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return text.split(pattern).map((part, i) =>
    aboutKeyTerms.includes(part) ? (
      <strong key={i} className='font-medium text-fg-strong'>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function About() {
  return (
    <Section id='about' label='About'>
      <div className='space-y-5 text-[15px] leading-[1.95]'>
        {aboutIntro.map((p) => (
          <p key={p}>{emphasize(p)}</p>
        ))}
      </div>
    </Section>
  );
}
