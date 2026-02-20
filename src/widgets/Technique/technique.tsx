'use client';

import { useState, useEffect, useRef } from 'react';
import { techniqueData } from '@/shared/data/site-data';

export default function Technique() {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [animatedSkills, setAnimatedSkills] = useState<number[]>([]);
  const [visibleCategory, setVisibleCategory] = useState('frontend');
  const [showPolygon, setShowPolygon] = useState(false);
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const animationIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const handleCategoryChange = (category) => {
    if (category !== selectedCategory) {
      cleanupAnimations();
      setSelectedCategory(category);
      setShowPolygon(false);
      setAnimatedSkills([]);
    }
  };

  const cleanupAnimations = () => {
    if (animationTimeoutRef.current) {
      clearTimeout(animationTimeoutRef.current);
      animationTimeoutRef.current = null;
    }

    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
  };

  useEffect(() => {
    setVisibleCategory(selectedCategory);
    setAnimatedSkills([]);

    animationTimeoutRef.current = setTimeout(() => {
      let nextIndex = 0;
      animationIntervalRef.current = setInterval(() => {
        if (nextIndex >= techniqueData[selectedCategory].items.length) {
          if (animationIntervalRef.current) {
            clearInterval(animationIntervalRef.current);
          }
          animationIntervalRef.current = null;
          return;
        }

        setAnimatedSkills(prev => [...prev, nextIndex]);

        if (nextIndex === 0) {
          setShowPolygon(true);
        }

        nextIndex++;
      }, 100);
    }, 300);

    return () => {
      cleanupAnimations();
    };
  }, [selectedCategory]);

  const categoryStyles = techniqueData[visibleCategory].styles;

  return (
    <div id="tech-stack-section" className="mb-20 relative">
      <div className='absolute -bottom-20 -right-20 w-40 h-40 rounded-full blur-3xl' style={{
        background: `linear-gradient(to right, ${categoryStyles.gradientFrom}, ${categoryStyles.gradientTo})`,
      }}></div>

      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-white/90 cursor-default'>기술 스택</h2>
      </div>
      <div className='flex flex-wrap gap-4 mb-8'>
        {Object.keys(techniqueData).map((category) => {
          const isSelected = selectedCategory === category;
          const styles = techniqueData[category].styles;

          return (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className="px-4 py-2 rounded-lg transition-all"
              style={isSelected ? {
                background: `linear-gradient(to right, ${styles.gradientFrom}, ${styles.gradientTo})`,
                color: styles.color,
              } : {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {techniqueData[category].label}
            </button>
          );
        })}
      </div>
      <div className='hidden md:block mb-8 relative'>
        <div className='w-full h-80 bg-white/5 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center'>
          <div className='relative w-64 h-64'>
            {[20, 40, 60, 80, 100].map((level) => (
              <div 
                key={level}
                className='absolute rounded-full border'
                style={{
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  top: `${50 - level/2}%`,
                  left: `${50 - level/2}%`,
                  width: `${level}%`,
                  height: `${level}%`,
                }}
              >
                <div className='absolute -top-2 left-1/2 transform -translate-x-1/2 text-xs text-white/40'>
                  {level}%
                </div>
              </div>
            ))}
            {techniqueData[visibleCategory].items.map((skill, index) => {
              const angle = (index * (360 / techniqueData[visibleCategory].items.length)) * (Math.PI / 180);
              const radius = (skill.level / 100) * 8;
              const x = Math.round(Math.cos(angle) * radius * 100) / 100;
              const y = Math.round(Math.sin(angle) * radius * 100) / 100;

              return (
                <div 
                  key={skill.name}
                  className='absolute h-3 w-3 rounded-full transition-all duration-700'
                  style={{
                    backgroundColor: categoryStyles.backgroundColor,
                    opacity: animatedSkills.includes(index) ? 1 : 0,
                    transform: `translate(${x}rem, ${y}rem)`,
                    top: '50%',
                    left: '50%',
                    marginLeft: '-0.375rem',
                    marginTop: '-0.375rem',
                  }}
                >
                  <div
                    className={`absolute whitespace-nowrap transform ${
                      angle > Math.PI ? 'translate-y-4 -translate-x-1/2' : '-translate-y-6 -translate-x-1/2'
                    } text-sm font-medium`}
                    style={{ color: categoryStyles.color }}
                  >
                    {skill.name}
                  </div>
                </div>
              );
            })}
            {showPolygon && (
              <svg 
                className='absolute inset-0 w-full h-full' 
                style={{ transform: 'rotate(-90deg)' }}
              >
                {/* <polygon 
                  points={techniqueData[visibleCategory].items
                    .map((skill, index) => {
                      if (!animatedSkills.includes(index)) return '';
                      const angle = (index * (360 / techniqueData[visibleCategory].items.length)) * (Math.PI / 180);
                      const radius = (skill.level / 100) * 32;
                      const x = (32 + Math.cos(angle) * radius).toFixed(2);
                      const y = (32 + Math.sin(angle) * radius).toFixed(2);
                      return `${x},${y}`;
                    })
                    .filter(Boolean)
                    .join(' ')
                  }
                  style={{
                    fill: categoryStyles.backgroundColor,
                    stroke: categoryStyles.backgroundColor,
                    opacity: 0.2,
                    transition: 'all 0.5s',
                  }}
                  strokeWidth="1"
                /> */}
              </svg>
            )}
          </div>
        </div>
      </div>
      <div className='space-y-4'>
        {techniqueData[visibleCategory].items.map((skill, index) => (
          <div 
            key={skill.name}
            className='bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all hover:bg-white/10'
          >
            <div className='flex justify-between mb-2'>
              <span className='font-medium text-white/90'>{skill.name}</span>
              <span style={{ color: categoryStyles.color }}>{skill.level}%</span>
            </div>
            <div className='w-full h-2 bg-white/10 rounded-full overflow-hidden'>
              <div 
                className='h-full transition-all duration-1000 ease-out'
                style={{ 
                  width: animatedSkills.includes(index) ? `${skill.level}%` : '0%',
                  backgroundColor: categoryStyles.backgroundColor,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
