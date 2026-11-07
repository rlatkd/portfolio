'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { FLOATING_BUTTON } from './floating-button';

export default function ScrollToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      type='button'
      aria-label='맨 위로'
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}
      className={`${FLOATING_BUTTON} ${show ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'}`}
    >
      <ChevronUp size={20} />
    </button>
  );
}
