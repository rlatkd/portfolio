'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type ThemeProps = 'light' | 'dark';

export function ThemeToggle({ floating = false }: { floating?: boolean }) {
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
    try { localStorage.setItem('theme', next); } catch { /* Theme still works without storage. */ }
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <button
      onClick={handleToggle}
      aria-label='테마 전환'
      aria-pressed={theme === 'dark'}
      className={`flex items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors hover:border-accent hover:text-accent ${floating ? 'h-11 w-11 shadow-lg' : 'h-9 w-9'}`}
    >
      {/* 하이드레이션 불일치 방지: 마운트 전엔 아이콘 비표시 */}
      {mounted && (theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />)}
    </button>
  );
}
