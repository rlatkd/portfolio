import { Pane } from '@/shared/ui/pane';
import { aboutIntro, aboutKeyTerms } from '@/shared/data/site-data';

// 문단 안의 핵심 문구만 진하게
function emphasize(text: string) {
  const pattern = new RegExp(`(${aboutKeyTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return text.split(pattern).map((part, i) =>
    aboutKeyTerms.includes(part) ? (
      <strong key={i} className='font-semibold text-fg-strong'>
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function About() {
  return (
    <Pane id='about' file='about.md'>
      {aboutIntro.map((p) => (
        <p key={p} className='mt-3 leading-8 first:mt-0'>{emphasize(p)}</p>
      ))}
    </Pane>
  );
}
