'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [xopsVisible, setXopsVisible] = useState(false);
  const [xopsOpacity, setXopsOpacity] = useState(0);
  
  useEffect(() => {
    const hasSessionCookie = document.cookie.includes('xops=true');
    
    // 쿠키 체크 (필요시 주석 해제)
    // if (hasSessionCookie) {
    //   router.push('/');
    //   return;
    // }
    
    // XOps 텍스트 페이드인 효과
    setTimeout(() => {
      setXopsVisible(true);
      const fadeInInterval = setInterval(() => {
        setXopsOpacity(prev => {
          if (prev >= 1) {
            clearInterval(fadeInInterval);
            return 1;
          }
          return prev + 0.05;
        });
      }, 100);
    }, 500);

    // 카운트다운 타이머
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, [router]);
  
  return (
    <div className='w-screen h-screen overflow-hidden flex items-center justify-center bg-black fixed inset-0'>
      <div className='text-center relative w-full h-full flex items-center justify-center'>
       
        <div className="mb-12">
          {xopsVisible && (
            <h1 
              className='text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 tracking-wider'
              style={{ opacity: xopsOpacity, transition: 'opacity 0.5s ease' }}
            >
              XOps
            </h1>
          )}
        </div>
      </div>
    </div>
  );
}