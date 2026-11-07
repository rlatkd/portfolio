'use client';

import { useEffect, useRef, useState } from 'react';
import { Files } from 'lucide-react';
import { navItems } from '@/shared/data/site-data';
import { FLOATING_BUTTON } from '@/shared/ui/floating-button';
import { useSectionNavigation } from './section-navigation';

// 모바일 · 태블릿(1024px 미만) 홈의 목차. 데스크톱은 사이드바 목차를 쓴다.
// 화면 오른쪽 위(아래쪽 위로 · 테마 버튼과 같은 세로줄)에 파일 목록 아이콘 버튼을 두고, about 영역에 들어서면 나타난다.
// 누르면 사이드바와 같은 목차가 버튼 아래에 열리고, 항목을 누르면 그 영역으로 이동한 뒤 닫힌다.
// 버튼은 아래쪽 떠 있는 버튼과 같은 모양이다. 열려 있으면 바깥 고리를 그린다.
const sectionIds = navItems.map(item => item.id);

export default function MobileSectionMenu() {
  const { active, navigate } = useSectionNavigation(sectionIds);
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  // about 영역 위 끝이 화면 위쪽(버튼 아래 끝 높이)에 닿으면 보인다. 다시 위로 올라가면 숨기고 목록도 닫는다.
  useEffect(() => {
    const update = () => {
      const about = document.getElementById(sectionIds[0]);
      const visible = !!about && about.getBoundingClientRect().top <= 68;
      setShow(visible);
      if (!visible) setOpen(false);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  // 목록 바깥을 누르거나 Esc를 누르면 닫는다. Esc는 포커스를 버튼으로 돌려준다.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setOpen(false);
      button.current?.focus();
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  return (
    <div ref={root} className='mobile-section-menu fixed right-[var(--floating-edge)] top-6 z-40 print:hidden lg:hidden'>
      <button
        ref={button}
        type='button'
        aria-label='목차'
        aria-expanded={open}
        aria-controls='mobile-section-menu-list'
        aria-hidden={!show}
        tabIndex={show ? 0 : -1}
        onClick={() => setOpen(value => !value)}
        data-section-menu-button
        className={`${FLOATING_BUTTON} ${open ? 'ring-2 ring-fg-strong ring-offset-2 ring-offset-bg' : ''} ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
      >
        <Files size={18} />
      </button>
      <nav id='mobile-section-menu-list' aria-label='포트폴리오 목차' hidden={!open} className='absolute right-0 top-full mt-2 w-max min-w-44 rounded-md border border-line bg-surface p-1.5 shadow-lg'>
        <ul className='font-code text-[13px]'>
          {navItems.map(item => {
            const on = active === item.id;
            return (
              <li key={item.id}>
                <a
                  href={`/#${item.id}`}
                  onClick={event => {
                    navigate(event, item.id);
                    setOpen(false);
                    // 닫힌 목록 안에 포커스가 남지 않게 버튼으로 돌려준다(화면은 움직이지 않는다).
                    button.current?.focus({ preventScroll: true });
                  }}
                  aria-current={on ? 'location' : undefined}
                  className={`block rounded px-3 py-2 transition-colors focus-visible:-outline-offset-2 ${on ? 'bg-nav-active text-fg-strong' : 'text-fg hover:text-accent'}`}
                >
                  {item.file}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
