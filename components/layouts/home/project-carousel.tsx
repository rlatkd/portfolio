'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { dummyProjects } from '@/data/dummy-projects';

export default function ProjectCarousel() {
  const carouselRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(null);

  const cardWidth = 480;
  const cardMargin = 24;
  const totalWidth = dummyProjects.length * (cardWidth + cardMargin * 2);
  const animationDuration = dummyProjects.length * 10;

  useEffect(() => {
    const carousel = carouselRef.current;

    if (!carousel) return;

    document.documentElement.style.setProperty('--carousel-width', `${totalWidth}px`);
    carousel.style.animation = `carouselScroll ${animationDuration}s linear infinite`;

    const handleMouseEnter = () => {
      carousel.style.animationPlayState = 'paused';
      setIsPaused(true);
    };

    const handleMouseLeave = () => {
      carousel.style.animationPlayState = 'running';
      setIsPaused(false);
    };

    carousel.addEventListener('mouseenter', handleMouseEnter);
    carousel.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      carousel.removeEventListener('mouseenter', handleMouseEnter);
      carousel.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animationDuration, totalWidth]);

  const handleProjectClick = (project) => {
    console.log(`프로젝트 클릭: ${project.title}`);
    // TODO 여기에 클릭 시 수행할 작업 추가 (예: 라우팅 등)
  };

  // TODO 이거 제대로 매핑; 팀 / 개인 / 학부에 따라 카테고리에 따른 색상 결정
  const getCategoryColor = (index) => {
    const colors = [
      { bg: 'from-blue-500/30 to-purple-500/30', text: 'text-blue-400' },
      { bg: 'from-purple-500/30 to-blue-500/30', text: 'text-purple-400' },
      { bg: 'from-green-500/30 to-blue-500/30', text: 'text-green-400' },
      { bg: 'from-orange-500/30 to-purple-500/30', text: 'text-orange-400' }
    ];
    return colors[index % colors.length];
  };

  return (
    <div className='mb-12 w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden'>
      <div className='max-w-4xl mx-auto mb-8 flex justify-between items-center'>
        <h2 className='text-2xl font-bold text-white/90 cursor-default'>최근 프로젝트</h2>
        <Link href='/projects' className='text-blue-400 hover:text-blue-300 flex items-center opacity-80 hover:opacity-100 transition-opacity'>
          모두 보기 <ArrowRight className='ml-1 w-4 h-4' />
        </Link>
      </div>
      <div className='relative overflow-hidden'>
        <div 
          ref={carouselRef}
          className='carousel-track flex'
          style={{
            width: `${totalWidth * 2}px`,
          }}
        >
          {dummyProjects.map((project, idx) => {
            const colorStyle = getCategoryColor(idx);
            return (
              <div 
                key={`original-${idx}`}
                className='flex-none mx-6'
                style={{ width: `${cardWidth}px` }}
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => setHoveredProject(`original-${idx}`)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className='w-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all h-full cursor-pointer'>
                  <div className={`aspect-video bg-gradient-to-r ${colorStyle.bg} relative overflow-hidden`}>
                    <div className='absolute inset-0 flex items-center justify-center text-white/30'>
                      {project.icon}
                    </div>
                    {hoveredProject === `original-${idx}` && (
                      <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center'>
                      </div>
                    )}
                  </div>
                  <div className='p-6'>
                    <div className='mb-3'>
                      <span className={`text-xs px-3 py-1 rounded-full bg-${colorStyle.text.split('-')[1]}-400/20 ${colorStyle.text}`}>
                        {project.category || '프로젝트'}
                      </span>
                    </div>
                    <h3 className='text-xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors'>{project.title}</h3>
                    <p className='text-white/70 mb-4 line-clamp-2'>{project.description}</p>
                    <div className='flex flex-wrap gap-2'>
                      {project.tags && project.tags.map((tag, tagIdx) => (
                        <span 
                          key={tagIdx} 
                          className={`text-xs px-2 py-1 ${tag.className || 'bg-white/10 text-white/70'} cursor-default`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          {dummyProjects.map((project, idx) => {
            const colorStyle = getCategoryColor(idx);
            return (
              <div 
                key={`duplicate-${idx}`}
                className='flex-none mx-6'
                style={{ width: `${cardWidth}px` }}
                onClick={() => handleProjectClick(project)}
                onMouseEnter={() => setHoveredProject(`duplicate-${idx}`)}
                onMouseLeave={() => setHoveredProject(null)}
              >
                <div className='w-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all h-full cursor-pointer'>
                  <div className={`aspect-video bg-gradient-to-r ${colorStyle.bg} relative overflow-hidden`}>
                    <div className='absolute inset-0 flex items-center justify-center text-white/30'>
                      {project.icon}
                    </div>
                    {hoveredProject === `duplicate-${idx}` && (
                      <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center'>
                      </div>
                    )}
                  </div>
                  <div className='p-6'>
                    <div className='mb-3'>
                      <span className={`text-xs px-3 py-1 rounded-full bg-${colorStyle.text.split('-')[1]}-400/20 ${colorStyle.text}`}>
                        {project.category || '프로젝트'}
                      </span>
                    </div>
                    <h3 className='text-xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors'>{project.title}</h3>
                    <p className='text-white/70 mb-4 line-clamp-2'>{project.description}</p>
                    <div className='flex flex-wrap gap-2'>
                      {project.tags && project.tags.map((tag, tagIdx) => (
                        <span 
                          key={tagIdx} 
                          className={`text-xs px-2 py-1 ${tag.className || 'bg-white/10 text-white/70'} cursor-default`}
                        >
                          {tag.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
