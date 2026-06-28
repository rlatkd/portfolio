import { Section } from '@/shared/ui/Section';
import { skillGroups } from '@/shared/data/site-data';

export default function Skills() {
  return (
    <Section id='skills' label='Skills & Tools'>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
        {skillGroups.map((g) => (
          <div key={g.label} className='rounded-lg border border-line bg-surface p-6'>
            <div className='mb-3 text-xs uppercase tracking-[0.2em] text-muted'>{g.label}</div>
            <div className='flex flex-wrap gap-2'>
              {g.items.map((it) => (
                <span
                  key={it}
                  className='rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-medium text-accent'
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
