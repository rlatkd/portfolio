'use client';

import '@/styles/global.css'; // 클라이언트 컴포넌트가 렌더링될 때, 루트 레이아웃 css가 늦게 나오는걸 방지
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setLogoVisible(true);
      const fadeInInterval = setInterval(() => {
        setLogoOpacity(prev => {
          if (prev >= 1) {
            clearInterval(fadeInInterval);
            setTimeout(() => {
              setTextVisible(true);
            }, 300);
            return 1;
          }
          return prev + 0.05;
        });
      }, 100);
    }, 500);

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setCookieAndRedirect();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, [router]);
  
  const setCookieAndRedirect = () => {
    document.cookie = 'xops=true; path=/';
    router.push('/');
  };
  
  const handleClick = () => {
    setCookieAndRedirect();
  };
  
  return (
    <div 
      className='w-screen h-screen overflow-hidden flex items-center justify-center bg-black fixed inset-0 cursor-pointer'
      onClick={handleClick}
    >
      <div className='text-center relative w-full h-full flex flex-col items-center justify-center'>
        <div className='flex flex-col items-center justify-center'>
          {logoVisible && (
            <div 
              className='flex flex-col items-center justify-center'
              style={{ opacity: logoOpacity, transition: 'opacity 0.5s ease' }}
            >
              <div className='flex flex-col items-center justify-center'>
                <img 
                  src='/logo.svg' 
                  alt='XOps Logo' 
                  className='h-80 w-auto' 
                />
                <div className='h-24 flex items-start justify-center'>
                  {textVisible && (
                    <div className='relative overflow-hidden mt-6'>
                      <span className='text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 tracking-wider
                                      animate-shimmer cursor-default'
                            style={{
                              backgroundSize: '200% 100%',
                              animation: 'shimmer 2s infinite linear'
                            }}>
                        X-Operations
                      </span>
                      <div className='h-0.5 w-0 bg-gradient-to-r from-blue-400 to-purple-600 mt-1 mx-auto
                                    animate-expand'
                           style={{
                             animation: 'expand 1.5s forwards ease-out'
                           }}>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
