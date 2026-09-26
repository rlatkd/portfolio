import { Send } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { profile } from '@/shared/data/site-data';

export default function Contact() {
  return (
    <Section id='contact' label='Contact'>
      <h3 className='text-2xl font-bold text-fg-strong md:text-3xl'>함께 일하고 싶으신가요?</h3>
      <p className='mt-4 max-w-xl leading-relaxed text-muted'>
        채용과 협업 제안은 이메일로 연락해 주세요. 결제·정산 채널 개발과 운영,
        외부 시스템 연동 경험에 관해 이야기 나눌 수 있습니다.
      </p>
      <p className='mt-3 max-w-xl leading-relaxed text-muted'>
        보내주신 내용을 확인한 뒤 답변드리겠습니다.
      </p>

      <a
        href={`mailto:${profile.email}`}
        className='mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 text-sm font-semibold text-navy transition-opacity hover:opacity-90'
      >
        <Send size={15} />
        이메일 보내기
      </a>
    </Section>
  );
}
