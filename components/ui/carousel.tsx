'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { dummyProjects } from '@/data/dummy-projects';


export default function Carousel() {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  // hover 시 일시 정지
  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const handleMouseEnter = () => {
      const computedStyle = window.getComputedStyle(carousel);
      const matrix = new WebKitCSSMatrix(computedStyle.transform);
      const currentTranslateX = matrix.m41; // 현재 translateX 값
      carousel.style.animation = 'none';
      carousel.style.transform = `translateX(${currentTranslateX}px)`;
      setIsPaused(true);
    };

    const handleMouseLeave = () => {
      if (isPaused) {
        const computedStyle = window.getComputedStyle(carousel);
        const matrix = new WebKitCSSMatrix(computedStyle.transform);
        const currentTranslateX = matrix.m41;
        const totalWidth = carousel.offsetWidth / 2;
        const progressPercentage = Math.abs(currentTranslateX) / totalWidth;
        const remainingPercentage = 1 - progressPercentage;
        const totalDuration = dummyProjects.length * 15;
        const remainingDuration = totalDuration * remainingPercentage;
        
        // 새 키프레임
        carousel.style.animation = `none`;
        void carousel.offsetHeight; // 리플로우 강제
        carousel.style.transform = `translateX(${currentTranslateX}px)`;
        
        // 새 애니메이션
        carousel.style.animation = `resumeCarousel ${remainingDuration}s linear infinite`;
        carousel.style.animationDelay = '0s';
        
        carousel.style.setProperty('--start-position', `${currentTranslateX}px`);
        carousel.style.setProperty('--end-position', `-${totalWidth}px`);
        
        setIsPaused(false);
      }
    };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isPaused, dummyProjects.length]);

  const cardWidth = 480; // 카드 너비를 더 크게 증가 (380 -> 480)
  const cardMargin = 24; // 간격 추가 증가 (20 -> 24)
  const totalWidth = dummyProjects.length * (cardWidth + cardMargin * 2);
  
  const animationDuration = dummyProjects.length * 10; // 애니메이션 속도

  // 프로젝트 클릭 핸들러 (추후에 실제 이동 로직 구현 예정)
  const handleProjectClick = (project) => {
    console.log(`프로젝트 클릭: ${project.title}`);
    // 여기에 클릭 시 수행할 작업 추가 (예: 라우팅 등)
  };

  return (
    <div className="mb-12 w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 mb-8 flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white/90 cursor-default">최근 프로젝트</h2>
        <Link href="/projects" className="text-blue-400 hover:text-blue-300 flex items-center">
          모두 보기 <ArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
      
      <div className="relative overflow-hidden">
        <div 
          ref={carouselRef}
          className="carousel-track"
          style={{
            display: 'flex',
            width: `${totalWidth * 2}px`,
            animation: `carouselScroll ${animationDuration}s linear infinite`,
          }}
        >
          {dummyProjects.map((project, idx) => (
            <div 
              key={`original-${idx}`}
              className="flex-none mx-6" // 마진 추가 증가 (mx-5 -> mx-6)
              style={{ width: `${cardWidth}px` }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="w-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all h-full cursor-pointer">
                <div className={`aspect-video bg-gradient-to-r ${project.bgFrom} ${project.bgTo} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    {project.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white/90">{project.title}</h3>
                  <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className={`text-xs px-3 py-1 ${tag.className} cursor-default`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
          {dummyProjects.map((project, idx) => (
            <div 
              key={`duplicate-${idx}`}
              className="flex-none mx-6" // 마진 추가 증가 (mx-5 -> mx-6)
              style={{ width: `${cardWidth}px` }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="w-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all h-full cursor-pointer">
                <div className={`aspect-video bg-gradient-to-r ${project.bgFrom} ${project.bgTo} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    {project.icon}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white/90">{project.title}</h3>
                  <p className="text-white/70 mb-4 line-clamp-2">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIdx) => (
                      <span 
                        key={tagIdx} 
                        className={`text-xs px-3 py-1 ${tag.className} cursor-default`}
                      >
                        {tag.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
