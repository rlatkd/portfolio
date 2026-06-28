import { profile } from '@/shared/data/site-data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-line'>
      <div className='mx-auto max-w-6xl px-6 py-8 md:px-16'>
        <p className='text-xs text-muted'>
          함께 일하고 싶다면 언제든{' '}
          <a href={`mailto:${profile.email}`} className='text-accent hover:underline'>
            {profile.email}
          </a>{' '}
          로 연락 주세요.
        </p>
        <p className='mt-2 text-xs text-muted'>
          © {year} {profile.name} ({profile.nameEn}) · Built with Next.js &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
