'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Page() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(3);
  const [logoVisible, setLogoVisible] = useState(false);
  const [logoOpacity, setLogoOpacity] = useState(0);
  
  useEffect(() => {
    const hasSessionCookie = document.cookie.includes('xops=true');
    
    // 쿠키 체크 (필요시 주석 해제)
    // if (hasSessionCookie) {
    //   router.push('/');
    //   return;
    // }
    
    setTimeout(() => {
      setLogoVisible(true);
      const fadeInInterval = setInterval(() => {
        setLogoOpacity(prev => {
          if (prev >= 1) {
            clearInterval(fadeInInterval);
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
          {logoVisible && (
            <div 
              className='flex items-center justify-center'
              style={{ opacity: logoOpacity, transition: 'opacity 0.5s ease' }}
            >
              <img 
                src="/logo.svg" 
                alt="XOps Logo" 
                className="h-20 w-auto -mr-2" 
              />
              <span className='text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 tracking-wider'>
                Ops
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
