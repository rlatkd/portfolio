'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function TableOfContents({ contents }) {
  const [section, setSection] = useState('');
  const [scrolling, setScrolling] = useState(false);
  const [visible, setVisible] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [tocTranslate, setTocTranslate] = useState(0);
  const pathname = usePathname();
  const headerHeight = 80;
  
  const lastUserActionRef = useRef<{
    type: string | null;
    time: number;
    section: string;
  }>({
    type: null,
    time: 0,
    section: ''
  });
  
  const lastScrollPositionRef = useRef(0);

  useEffect(() => {
    let scrollTimeout;
    
    const updateSection = () => {
      if (scrolling) return;
      
      const currentScrollPosition = window.scrollY;
      const currentTime = Date.now();
      
      const isUserScrolling = Math.abs(currentScrollPosition - lastScrollPositionRef.current) > 5;
      lastScrollPositionRef.current = currentScrollPosition;
      
      if (lastUserActionRef.current.type === 'click' && 
          currentTime - lastUserActionRef.current.time < 300 &&
          !isUserScrolling) {
        return;
      }

      if (isUserScrolling) {
        clearTimeout(scrollTimeout);
        lastUserActionRef.current = {
          type: 'scroll',
          time: currentTime,
          section: ''
        };
      }
      
      let currentSection = '';
      const scrollPosition = currentScrollPosition + headerHeight;
      
      contents.forEach(({ id }) => {
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          if (scrollPosition >= sectionTop) {
            currentSection = id;
          }
        }
      });
      
      // 첫 번째 구역보다 위에 있으면 강조 제거
      const firstSection = contents[0];
      if (firstSection) {
        const firstSectionTop = document.getElementById(firstSection.id)?.offsetTop || 0;
        if (scrollPosition < firstSectionTop) {
          currentSection = '';
        }
      }
      
      // 구역이 변경되었고, 사용자 스크롤에 의한 것이면 구역 업데이트
      if (currentSection !== section && 
          (lastUserActionRef.current.type === 'scroll' || 
           lastUserActionRef.current.section !== section)) {
        setSection(currentSection);
      }
    };

    const checkNavigationVisibility = () => {
      const navigationElement = document.querySelector('div#navigation') || document.querySelector('.navigation');
      
      if (navigationElement) {
        const navigationTop = navigationElement.getBoundingClientRect().top;
        const threshold = 250;
        
        if (navigationTop <= threshold) {
          const offset = threshold - navigationTop;
          setTocTranslate(0);
          setOpacity(Math.max(0, 1 - offset / 200));
        } else {
          setTocTranslate(0);
          setOpacity(1);
        }
      }
    };

    // 스크롤 이벤트핸들러
    const handleScroll = () => {
      updateSection(); // 구역 업데이트
      checkNavigationVisibility(); // 네비게이션 보이냐마냐 확인
    };

    window.addEventListener('scroll', handleScroll);

    // 구역 변경 이벤트핸들러
    const handleSectionChange = () => {
      const hash = decodeURIComponent(window.location.hash.replace('#', ''));
      setSection(hash);
    };

    window.addEventListener('hashchange', handleSectionChange);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleSectionChange);
      clearTimeout(scrollTimeout);
    };
  }, [contents, pathname, scrolling, section]);

  // 구역 클릭 이벤트핸들러
  const handleSectionClick = (id) => {
    lastUserActionRef.current = {
      type: 'click',
      time: Date.now(),
      section: id
    };
    
    setSection(id);
    window.location.hash = `#${id}`;

    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      // 현재 스크롤 위치 저장
      lastScrollPositionRef.current = window.scrollY;
      
      setScrolling(true);
      window.scrollTo({
        top: sectionElement.offsetTop - headerHeight,
        behavior: 'smooth' // 부드러운 스크롤 사용
      });
      
      setTimeout(() => {
        setScrolling(false);
      }, 500);
    }
  };
  
  // 목차없으면 Null
  if (!visible || !contents || contents.length === 0) return null;

  return (
    <nav 
      className='text-sm w-full transition-all duration-300' 
      style={{ opacity: opacity, transform: `translateY(${tocTranslate}px)` }}
    >
      <ul className='ml-2 space-y-1'>
        {contents.map(({ level, text, id }) => (
          <li key={id} className={`ml-${(level - 1) * 2}`}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick(id);
              }}
              className={`hover:underline transition-all duration-300 ${
                id === section ? 'font-bold text-white/90 text-base' : 'text-white/70 text-sm'
              }`}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
