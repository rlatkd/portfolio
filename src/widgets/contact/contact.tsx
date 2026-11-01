import { CopyEmail } from '@/features/copy-email/copy-email';
import { Pane } from '@/shared/ui/pane';
import { profile } from '@/shared/data/site-data';

export default function Contact() {
  return (
    <Pane id='contact' file='contact.md'>
      <h3 className='text-xl font-bold tracking-tight text-fg-strong'>함께 일하고 싶으신가요?</h3>
      <p className='mt-3 leading-7'>채용 및 협업 제안은 이메일로 연락해 주세요.</p>
      <p className='leading-7'>보내주신 내용을 확인한 뒤 답변드리겠습니다.</p>
      {/* VS Code 보조 버튼: 주소를 그대로 보여 주고, 옆에 복사 버튼을 둔다. */}
      <div className='mt-4 flex flex-wrap items-center gap-2'>
        <a
          href={`mailto:${profile.email}`}
          className='inline-flex items-center rounded-md border border-button-2-border bg-button-2 px-4 py-2.5 text-[14px] font-medium text-on-button-2 transition-colors hover:border-accent hover:text-accent'
        >
          {profile.email}
        </a>
        <CopyEmail email={profile.email} />
      </div>
    </Pane>
  );
}
