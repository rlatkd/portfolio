import { profile } from '@/shared/data/site-data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='pb-16 text-xs leading-[1.9] text-muted'>
      <p>
        <a href='/privacy' className='underline underline-offset-2 hover:text-accent'>
          개인정보 및 방문 분석 안내
        </a>{' '}
        · © {year} {profile.name} ({profile.nameEn})
      </p>
    </footer>
  );
}
