import { Send } from 'lucide-react';
import { CopyEmail } from '@/features/CopyEmail/CopyEmail';
import { Section } from '@/shared/ui/Section';
import { profile } from '@/shared/data/site-data';

export default function Contact() {
  return (
    <Section id='contact' label='Contact'>
      <h3 className='text-2xl font-bold tracking-tight text-fg-strong md:text-3xl'>함께 일하고 싶으신가요?</h3>
      <p className='mt-4 text-[15px] leading-[1.95]'>
        채용 및 협업 제안은 이메일로 연락해 주세요.
      </p>
      <p className='mt-2 text-[15px] leading-[1.95]'>보내주신 내용을 확인한 뒤 답변드리겠습니다.</p>

      <div className='mt-7 flex flex-wrap items-start gap-x-4'>
        <a
          href={`mailto:${profile.email}`}
          className='mt-4 inline-flex items-center gap-2 rounded-full border border-accent px-4 py-2 text-sm font-semibold text-accent transition-colors hover:bg-[color-mix(in_srgb,var(--accent)_12%,transparent)]'
        >
          <Send size={15} />
          이메일 보내기
        </a>
        <CopyEmail email={profile.email} />
      </div>
    </Section>
  );
}
