'use client';

import { useState, useEffect, useRef } from 'react';
import { achievementData } from '@/shared/data/site-data';

export default function Achievement() {
  const [counts, setCounts] = useState(achievementData.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);
  
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };
    
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated) {
        startCounting();
        setHasAnimated(true);
      }
    }, options);
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasAnimated]);
  
  const startCounting = () => {
    achievementData.forEach((achievement, index) => {
      const duration = 2000; // 애니메이션 지속 시간 (ms)
      const frameDuration = 1000 / 60; // 60fps
      const totalFrames = Math.round(duration / frameDuration);
      const { endValue } = achievement;
      
      let frame = 0;
      const counter = setInterval(() => {
        frame++;
        const progress = frame / totalFrames;
        const currentCount = Math.round(progress * endValue);
        
        setCounts(prevCounts => {
          const newCounts = [...prevCounts];
          newCounts[index] = currentCount;
          return newCounts;
        });
        
        if (frame === totalFrames) {
          clearInterval(counter);
        }
      }, frameDuration);
    });
  };
  
  return (
    <div className='mb-20' ref={sectionRef}>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-white/90 cursor-default'>주요 성과</h2>
      </div>
      
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
        {achievementData.map((achievement, index) => (
          <div 
            key={index} 
            className='bg-white/5 backdrop-blur-sm rounded-xl p-6 hover:bg-white/10 transition-all text-center'
          >
            <div className={`w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-to-r ${achievement.gradient} flex items-center justify-center`}>
              {achievement.icon}
            </div>
            
            <div className='text-3xl md:text-4xl font-bold text-white/90 mb-2'>
              {counts[index]}{achievement.suffix}
            </div>
            
            <div className='text-white/70 text-sm'>
              {achievement.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
