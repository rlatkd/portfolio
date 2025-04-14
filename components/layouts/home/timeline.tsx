'use client';

import { useState, useEffect, useRef } from 'react';
import { Calendar, Briefcase, GraduationCap, Code } from 'lucide-react';

const timelineItems = [
  {
    icon: <Briefcase className='w-5 h-5 text-blue-400' />,
    title: '시니어 프론트엔드 개발자',
    organization: '테크 기업',
    period: '2023 - 현재',
    description: '핵심 웹 애플리케이션 개발 및 최적화, 주니어 개발자 멘토링',
    gradient: 'from-blue-500/20 to-blue-600/20',
  },
  {
    icon: <Code className='w-5 h-5 text-purple-400' />,
    title: '프론트엔드 개발자',
    organization: '스타트업',
    period: '2020 - 2023',
    description: 'React 기반 사용자 인터페이스 구축 및 UX 개선 프로젝트 주도',
    gradient: 'from-purple-500/20 to-purple-600/20',
  },
  {
    icon: <GraduationCap className='w-5 h-5 text-green-400' />,
    title: '컴퓨터 공학 학사',
    organization: '대학교',
    period: '2016 - 2020',
    description: '웹 개발 및 사용자 경험 디자인 집중 과정 이수',
    gradient: 'from-green-500/20 to-green-600/20',
  }
];

export default function Timeline() {
  const [activeItem, setActiveItem] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const sectionRef = useRef(null);
  
  // 클라이언트 사이드에서만 렌더링
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // IntersectionObserver 설정
  useEffect(() => {
    if (!isMounted) return;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = sectionRef.current;
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [isMounted]);

  // 스켈레톤 UI
  if (!isMounted) {
    return (
      <div className='mb-20 relative'>
        <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl'></div>
        
        <div className='flex justify-between items-center mb-8'>
          <div className='w-48 h-8 bg-white/5 rounded-lg animate-pulse'></div>
        </div>
        
        <div className='relative z-10'>
          <div className='absolute left-8 top-6 bottom-6 w-px bg-white/10'></div>
          
          <div className='space-y-10'>
            {[1, 2, 3].map((_, index) => (
              <div key={index} className='relative pl-16'>
                <div className='absolute left-0 top-0 w-16 h-16 rounded-full bg-white/5 animate-pulse'></div>
                
                <div className='bg-white/5 backdrop-blur-sm p-6 rounded-xl animate-pulse'>
                  <div className='w-full md:flex md:justify-between md:items-center mb-4'>
                    <div className='w-3/4 h-6 bg-white/10 rounded-lg mb-2 md:mb-0'></div>
                    <div className='w-1/3 h-4 bg-white/10 rounded-lg'></div>
                  </div>
                  
                  <div className='w-1/2 h-5 bg-white/10 rounded-lg mb-3'></div>
                  <div className='w-full h-4 bg-white/10 rounded-lg'></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={sectionRef}
      className={`mb-20 relative transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl'></div>
      
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-white/90 cursor-default'>경력 타임라인</h2>
      </div>
      
      <div className='relative z-10'>
        <div className='absolute left-8 top-6 bottom-6 w-px bg-white/10'></div>
        
        <div className='space-y-10'>
          {timelineItems.map((item, index) => (
            <div 
              key={index}
              className={`relative pl-16 transition-all duration-700 transform
                         ${isVisible 
                            ? 'opacity-100 translate-x-0' 
                            : 'opacity-0 -translate-x-10'}`}
              style={{ transitionDelay: `${index * 200}ms` }}
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div className={`absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center transition-all duration-300 ${activeItem === index ? 'scale-110' : ''}`}>
                {item.icon}
              </div>
              
              <div className='bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-3'>
                  <h3 className='text-xl font-semibold text-white/90'>{item.title}</h3>
                  <div className='flex items-center text-white/60 text-sm mt-2 md:mt-0'>
                    <Calendar className='w-4 h-4 mr-1' />
                    <span>{item.period}</span>
                  </div>
                </div>
                
                <p className='text-white/70 font-medium mb-2'>{item.organization}</p>
                <p className='text-white/70'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
