'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type ThemeProps = 'light' | 'dark';

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeProps>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // themeEffect가 이미 <html>에 적용한 결과를 읽어옴
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');
    setMounted(true);
  }, []);

  const handleToggle = () => {
    const next: ThemeProps = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    localStorage.setItem('theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      aria-label='테마 전환'
      className='flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg transition-colors hover:border-accent hover:text-accent'
    >
      {/* 하이드레이션 불일치 방지: 마운트 전엔 아이콘 비표시 */}
      {mounted && (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />)}
    </button>
  );
}
