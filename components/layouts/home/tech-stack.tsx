'use client';

import { useState, useEffect } from 'react';
import { Code, CheckCircle, CircleSlash } from 'lucide-react';

// 기술 스택 데이터
const techStack = {
  frontend: [
    { name: 'React', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'TypeScript', level: 80 },
    { name: 'Tailwind CSS', level: 95 },
    { name: 'CSS/SCSS', level: 90 },
    { name: 'JavaScript', level: 95 }
  ],
  backend: [
    { name: 'Node.js', level: 75 },
    { name: 'Express', level: 70 },
    { name: 'GraphQL', level: 65 },
    { name: 'REST API', level: 85 },
    { name: 'Firebase', level: 80 }
  ],
  tools: [
    { name: 'Git', level: 90 },
    { name: 'Figma', level: 75 },
    { name: 'Docker', level: 65 },
    { name: 'AWS', level: 60 },
    { name: 'Testing', level: 70 }
  ]
};

// 색상 매핑
const categoryColors = {
  frontend: {
    primary: 'text-blue-400',
    gradient: 'from-blue-500/20 to-blue-600/20',
    progress: 'bg-blue-400'
  },
  backend: {
    primary: 'text-purple-400',
    gradient: 'from-purple-500/20 to-purple-600/20',
    progress: 'bg-purple-400'
  },
  tools: {
    primary: 'text-green-400',
    gradient: 'from-green-500/20 to-green-600/20',
    progress: 'bg-green-400'
  }
};

export default function TechStack() {
  const [selectedCategory, setSelectedCategory] = useState('frontend');
  const [animatedSkills, setAnimatedSkills] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  
  // 클라이언트 사이드에서만 렌더링하기 위한 효과
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // 스킬 레벨을 애니메이션으로 표시하기 위한 효과
  useEffect(() => {
    if (!isMounted) return;
    
    setAnimatedSkills([]);
    
    // 선택된 카테고리가 변경될 때 애니메이션 리셋
    const timer = setTimeout(() => {
      let delay = 100;
      const interval = setInterval(() => {
        setAnimatedSkills(prev => {
          const nextIndex = prev.length;
          if (nextIndex >= techStack[selectedCategory].length) {
            clearInterval(interval);
            return prev;
          }
          return [...prev, nextIndex];
        });
        delay += 100;
      }, delay);
      
      return () => clearInterval(interval);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [selectedCategory, isMounted]);
  
  // 스크롤시 컴포넌트 보이는 효과
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
    
    const element = document.getElementById('tech-stack-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [isMounted]);
  
  // 클라이언트 사이드에서만 렌더링
  if (!isMounted) {
    return (
      <div id="tech-stack-section" className="mb-20 relative opacity-0">
        <div className='flex justify-between items-center mb-8'>
          <h2 className='text-2xl font-bold text-white/90 cursor-default'>기술 스택</h2>
        </div>
        <div className='w-full h-80 bg-white/5 backdrop-blur-sm rounded-xl'></div>
      </div>
    );
  }
  
  return (
    <div id="tech-stack-section" className={`mb-20 relative transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur-3xl'></div>
      
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-white/90 cursor-default'>기술 스택</h2>
      </div>
      
      {/* 카테고리 탭 */}
      <div className='flex flex-wrap gap-4 mb-8'>
        {Object.keys(techStack).map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedCategory === category 
                ? `bg-gradient-to-r ${categoryColors[category].gradient} ${categoryColors[category].primary}`
                : 'bg-white/5 text-white/70 hover:bg-white/10'
            }`}
          >
            {category === 'frontend' ? '프론트엔드' : 
             category === 'backend' ? '백엔드' : '도구 & 기타'}
          </button>
        ))}
      </div>
      
      {/* 스킬 레이더 차트 (모바일에서는 숨김) */}
      <div className='hidden md:block mb-8 relative'>
        <div className='w-full h-80 bg-white/5 backdrop-blur-sm rounded-xl p-4 flex items-center justify-center'>
          <div className='relative w-64 h-64'>
            {/* 배경 원 */}
            {[20, 40, 60, 80, 100].map((level) => (
              <div 
                key={level}
                className='absolute rounded-full border border-white/10'
                style={{
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
            
            {/* 스킬 점 */}
            {techStack[selectedCategory].map((skill, index) => {
              const angle = (index * (360 / techStack[selectedCategory].length)) * (Math.PI / 180);
              // 소수점 반올림으로 하이드레이션 불일치 방지
              const radius = (skill.level / 100) * 32;
              const x = Math.round(Math.cos(angle) * radius * 100) / 100;
              const y = Math.round(Math.sin(angle) * radius * 100) / 100;
              
              return (
                <div 
                  key={skill.name}
                  className={`absolute h-3 w-3 rounded-full ${categoryColors[selectedCategory].progress} transition-all duration-700`}
                  style={{
                    opacity: animatedSkills.includes(index) ? 1 : 0,
                    transform: `translate(${x}rem, ${y}rem)`,
                    top: '50%',
                    left: '50%',
                    marginLeft: '-0.375rem',
                    marginTop: '-0.375rem',
                  }}
                  suppressHydrationWarning
                >
                  <div className={`absolute whitespace-nowrap transform ${
                    angle > Math.PI ? 'translate-y-4 -translate-x-1/2' : '-translate-y-6 -translate-x-1/2'
                  } text-sm font-medium ${categoryColors[selectedCategory].primary}`}>
                    {skill.name}
                  </div>
                </div>
              );
            })}
            
            {/* 연결선 */}
            <svg 
              className='absolute inset-0 w-full h-full' 
              style={{ transform: 'rotate(-90deg)' }}
            >
              <polygon 
                points={techStack[selectedCategory]
                  .map((skill, index) => {
                    if (!animatedSkills.includes(index)) return '';
                    const angle = (index * (360 / techStack[selectedCategory].length)) * (Math.PI / 180);
                    const radius = (skill.level / 100) * 32;
                    // 소수점 반올림으로 하이드레이션 불일치 방지
                    const x = Math.round((32 + Math.cos(angle) * radius) * 100) / 100;
                    const y = Math.round((32 + Math.sin(angle) * radius) * 100) / 100;
                    return `${x},${y}`;
                  })
                  .filter(Boolean)
                  .join(' ')
                }
                className={`${categoryColors[selectedCategory].progress} opacity-20 transition-all duration-500`}
                strokeWidth="1"
                stroke={categoryColors[selectedCategory].progress}
                fill={categoryColors[selectedCategory].progress}
                suppressHydrationWarning
              />
            </svg>
          </div>
        </div>
      </div>
      
      {/* 스킬 바 (모든 화면 크기에서 표시) */}
      <div className='space-y-4'>
        {techStack[selectedCategory].map((skill, index) => (
          <div 
            key={skill.name}
            className='bg-white/5 backdrop-blur-sm rounded-lg p-4 transition-all hover:bg-white/10'
          >
            <div className='flex justify-between mb-2'>
              <span className='font-medium text-white/90'>{skill.name}</span>
              <span className={`${categoryColors[selectedCategory].primary}`}>{skill.level}%</span>
            </div>
            <div className='w-full h-2 bg-white/10 rounded-full overflow-hidden'>
              <div 
                className={`h-full ${categoryColors[selectedCategory].progress} transition-all duration-1000 ease-out`}
                style={{ 
                  width: animatedSkills.includes(index) ? `${skill.level}%` : '0%',
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
