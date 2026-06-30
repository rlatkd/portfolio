import { profile, navItems } from '@/shared/data/site-data';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-line bg-surface'>
      <div className='mx-auto max-w-6xl px-6 py-14 md:px-16'>
        <div className='grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3'>
          {/* 브랜드 */}
          <div className='lg:col-span-2'>
            <div className='font-mono text-xs uppercase tracking-[0.25em] text-accent'>
              {profile.role}
            </div>
            <div className='mt-2 text-lg font-bold text-fg-strong'>
              {profile.name} <span className='text-muted'>·</span>{' '}
              <span className='italic text-muted'>{profile.nameEn}</span>
            </div>
            <p className='mt-3 max-w-md text-sm leading-relaxed text-muted'>{profile.intro}</p>
            <a
              href={`mailto:${profile.email}`}
              className='mt-4 inline-block text-sm text-muted transition-colors hover:text-accent'
            >
              {profile.email}
            </a>
          </div>

          {/* 네비게이션 */}
          <div>
            <div className='mb-4 text-xs uppercase tracking-[0.2em] text-muted'>Navigation</div>
            <ul className='grid grid-cols-2 gap-x-6 gap-y-2'>
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`/#${item.id}`}
                    className='text-sm text-muted transition-colors hover:text-accent'
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='mt-12 border-t border-line pt-6 text-xs text-muted'>
          <p>
            © {year} {profile.name} ({profile.nameEn}). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
