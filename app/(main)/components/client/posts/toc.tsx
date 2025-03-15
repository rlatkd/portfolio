"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function TableOfContents({ contents }) {
  const [section, setSection] = useState(""); // 목차의 구역 설정
  const [scrolling, setScrolling] = useState(false); // 스크롤 상태 추적
  const [visible, setVisible] = useState(true); // 컴포넌트 표시 여부
  const [opacity, setOpacity] = useState(1); // 투명도 조절
  const pathname = usePathname();
  const headerHeight = 80; // 레이아웃 헤더의 높이

  useEffect(() => {
    const updateSection = () => {
      if (scrolling) return; // 스크롤 이벤트가 비활성화된 동안 동작 X
      let currentSection = ""; // 현재 구역

      contents.forEach(({ id }) => {
        const sectionElement = document.getElementById(id);
        if (sectionElement) {
          const sectionTop = sectionElement.offsetTop;
          const scrollPosition = window.scrollY + headerHeight;

          if (scrollPosition >= sectionTop) {
            currentSection = id;
          }
        }
      });

      // 첫 번째 섹션보다 위로 올라가면 강조 제거
      const firstSection = contents[0];
      if (firstSection) {
        const firstSectionTop = document.getElementById(firstSection.id)?.offsetTop || 0;
        if (window.scrollY + headerHeight < firstSectionTop) {
          currentSection = "";
        }
      }

      // 마지막 섹션보다 아래로 내려가면 강조 제거
      const lastSection = contents[contents.length - 1];
      if (lastSection) {
        const lastSectionElement = document.getElementById(lastSection.id);
        if (lastSectionElement) {
          const lastSectionBottom = lastSectionElement.offsetTop + lastSectionElement.offsetHeight;
          if (window.scrollY > lastSectionBottom) {
            currentSection = "";
          }
        }
      }

      setSection(currentSection);
    };

    // 네비게이션 영역 감지 및 투명도 조절 함수
    const checkNavigationVisibility = () => {
      const navigationElement = document.querySelector('div#navigation') || document.querySelector('.navigation');
      
      if (navigationElement) {
        const navigationTop = navigationElement.getBoundingClientRect().top;
        const threshold = 500; // 감지 시작 거리
        const fadeDistance = 200; // 서서히 사라지는 거리
        
        if (navigationTop < threshold) {
          const newOpacity = Math.max(0, Math.min(1, (navigationTop - (threshold - fadeDistance)) / fadeDistance));
          setOpacity(newOpacity);
        
          if (newOpacity < 0.05) {
            setVisible(false); // 완전히 투명해지면 렌더링 X
          } else {
            setVisible(true);
          }
        } else {
          setOpacity(1);
          setVisible(true);
        }
      }
    };

    // 스크롤 이벤트 핸들러
    const handleScroll = () => {
      updateSection(); // 구역 파싱용
      checkNavigationVisibility(); // 네비게이션 위치 감지용
    };

    window.addEventListener("scroll", handleScroll);

    // 구역 변경 이벤트핸들러
    const handleSectionChange = () => {
      const hash = decodeURIComponent(window.location.hash.replace("#", ""));
      setSection(hash);
    };

    window.addEventListener("hashchange", handleSectionChange);

    // 초기 상태 설정
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleSectionChange);
    };
  }, [contents, pathname, scrolling]);

  // 구역 클릭 이벤트핸들러
  const handleSectionClick = (id) => {
    setSection(id);
    window.location.hash = `#${id}`;

    // 클릭 후 바로 해당 구역으로 스크롤을 강제로 이동
    const sectionElement = document.getElementById(id);
    if (sectionElement) {
      window.scrollTo({
        top: sectionElement.offsetTop - headerHeight,
      });
    }

    setScrolling(true); // 클릭 후 스크롤 비활성화
    setTimeout(() => {
      setScrolling(false)}, 200);
  };

  // visible이 false면 컴포넌트를 렌더링 X
  if (!visible || !contents || contents.length === 0) return null;

  return (
    <nav 
      className="text-sm w-full  transition-opacity duration-300" 
      style={{ opacity: opacity }}
    >
      <ul className="ml-2 space-y-1">
        {contents.map(({ level, text, id }) => (
          <li key={id} className={`ml-${(level - 1) * 2}`}>
            <a
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                handleSectionClick(id);
              }}
              className={`hover:underline transition-all duration-300 ${
                id === section ? "font-bold text-neutral-600 text-base" : "text-neutral-500 text-sm"
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
