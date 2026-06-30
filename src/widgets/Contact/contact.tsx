import { Send } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { profile } from '@/shared/data/site-data';

export default function Contact() {
  return (
    <Section id='contact' label='Contact'>
      <h3 className='text-2xl font-bold text-fg-strong md:text-3xl'>함께 일하고 싶으신가요?</h3>
      <p className='mt-4 max-w-xl leading-relaxed text-muted'>
        새로운 기회나 협업, 기술적인 논의 등 어떤 문의든 환영합니다.<br/>아래 버튼을 누르면 메일 작성 창이 열리며{' '}
        <span className='font-medium text-fg-strong'>{profile.email}</span> 로 전달됩니다.
      </p>

      <a
        href={`mailto:${profile.email}`}
        className='mt-6 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-navy transition-opacity hover:opacity-90'
      >
        <Send size={15} />
        이메일 보내기
      </a>
    </Section>
  );
}
