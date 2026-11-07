'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { FLOATING_BUTTON } from '@/shared/ui/floating-button';

type ThemeProps = 'light' | 'dark';

export function ThemeToggle() {
  // aria-pressed용 상태. 화면의 아이콘은 이 상태가 아니라 <html>의 dark 클래스(CSS)로 고른다.
  const [theme, setTheme] = useState<ThemeProps>('dark');

  useEffect(() => {
    // themeEffect가 이미 <html>에 적용한 결과를 읽어옴
    setTheme(document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  }, []);

  const handleToggle = () => {
    const next: ThemeProps = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    setTheme(next);
    try { localStorage.setItem('theme', next); } catch { /* Theme still works without storage. */ }
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <button
      type='button'
      onClick={handleToggle}
      aria-label='테마 전환'
      aria-pressed={theme === 'dark'}
      className={FLOATING_BUTTON}
    >
      {/* 두 아이콘을 모두 그리고, 그리기 전에 붙는 dark 클래스(theme-effect.ts)에 따라 CSS로 하나만 보인다.
          JavaScript를 기다리지 않아 첫 화면부터 아이콘이 보이고, 서버 HTML과 같아 하이드레이션 불일치가 없다. */}
      <Sun size={16} aria-hidden='true' className='hidden dark:block' />
      <Moon size={16} aria-hidden='true' className='dark:hidden' />
    </button>
  );
}
