import { profile } from '@/shared/data/site-data';
import { PrivacyNotice } from '@/features/privacy-notice/privacy-notice';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='pb-16 font-code text-[12px] leading-[1.9] text-muted'>
      {/* 모달(dialog)이 들어가므로 p가 아닌 div로 감싼다. */}
      <div>
        <PrivacyNotice />{' '}
        · © {year} {profile.nameEn}
      </div>
    </footer>
  );
}
