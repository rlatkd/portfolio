import { Copyright } from 'lucide-react';
import { profile } from '@/shared/data/site-data';
import { PrivacyNotice } from '@/features/privacy-notice/privacy-notice';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='pb-16 font-code text-[12px] leading-[1.9] text-muted'>
      {/* 모달(dialog)이 들어가므로 p가 아닌 div로 감싼다. */}
      {/* 글꼴의 ©는 12px에서 숫자보다 작고 흐려 아이콘으로 그린다(12px · 선 2.4, 세로 중심을 숫자에 맞춤).
          화면 낭독기에는 숨긴 © 글자를 읽힌다. */}
      <div>
        <PrivacyNotice />{' '}
        · <Copyright size={12} strokeWidth={2.4} aria-hidden='true' className='inline-block align-[-0.14em]' /><span className='sr-only'>©</span> {year} {profile.nameEn}
      </div>
    </footer>
  );
}
