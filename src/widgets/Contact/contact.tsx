import { Send, ArrowUpRight } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { profile, contactLinks } from '@/shared/data/site-data';

export default function Contact() {
  return (
    <Section id='contact' label='Contact'>
      <h3 className='text-2xl font-bold text-fg-strong md:text-3xl'>함께 일하고 싶으신가요?</h3>
      <p className='mt-4 max-w-xl leading-relaxed text-muted'>
        새로운 기회나 협업, 기술적인 논의 등 어떤 문의든 환영합니다. 아래 버튼을 누르면 메일 작성 창이 열리며{' '}
        <span className='font-medium text-fg-strong'>{profile.email}</span> 로 전달됩니다.
      </p>

      <a
        href={`mailto:${profile.email}`}
        className='mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-navy transition-opacity hover:opacity-90'
      >
        <Send size={15} />
        이메일 보내기
      </a>

      <div className='mt-12'>
        <div className='mb-4 text-xs uppercase tracking-[0.2em] text-muted'>Links</div>
        <div className='grid grid-cols-1 gap-3 sm:grid-cols-2'>
          {contactLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel='noopener noreferrer'
              className='group flex items-center justify-between rounded-lg border border-line bg-surface px-5 py-4 transition-colors hover:border-accent'
            >
              <span>
                <span className='block font-medium text-fg-strong'>{l.label}</span>
                <span className='block text-xs text-muted'>{l.sub}</span>
              </span>
              <ArrowUpRight
                size={16}
                className='text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent'
              />
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}
