import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowUp } from 'lucide-react';
import { profile, projects } from '@/shared/data/site-data';
import DemoNav from './_components/DemoNav';
import { cases } from './_components/cases';

// 디자인 개편 데모 — 기존 메인(/)은 그대로 두고 별도 경로로 비교용 제공
export const metadata: Metadata = {
  title: { default: 'Demo', template: '%s · Demo · 김상훈' },
  robots: { index: false, follow: false },
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id='top' className='text-fg [word-break:keep-all]'>
      <DemoNav
        cases={cases.map(({ href, label }) => ({ href, label }))}
        projects={projects.map((p) => ({ href: `/demo/projects/${p.id}`, label: p.title }))}
        role={profile.role}
        name={profile.nameEn}
      />
      <main id='main-content'>{children}</main>
      <footer className='border-t border-line px-4 py-8 text-center text-xs text-muted'>
        디자인 데모 · <Link href='/' className='text-accent hover:underline'>현재 사이트로 이동</Link>
      </footer>
      <a
        href='#top'
        aria-label='맨 위로'
        className='fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface text-fg-strong shadow-md hover:text-accent'
      >
        <ArrowUp size={18} />
      </a>
    </div>
  );
}
