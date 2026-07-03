import { Send } from 'lucide-react';
import { Section } from '@/shared/ui/Section';
import { profile } from '@/shared/data/site-data';

export default function Contact() {
  return (
    <Section id='contact' label='Contact'>
      <h3 className='text-2xl font-bold text-fg-strong md:text-3xl'>함께 일하고 싶으신가요?</h3>
      <p className='mt-4 max-w-xl leading-relaxed text-muted'>
        새로운 기회나 협업, 기술적인 논의 등 어떤 문의든 환영합니다. 데이터 정합성과 시스템
        신뢰성을 중요하게 여기는 팀에서, 금융·백엔드 도메인의 문제를 함께 풀어가는 일이라면 특히
        반갑습니다.
      </p>
      <p className='mt-3 max-w-xl leading-relaxed text-muted'>
        아래 버튼으로 편하게 연락 주시면 확인하는 대로 답변드리겠습니다.
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
