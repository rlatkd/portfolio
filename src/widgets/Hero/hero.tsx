'use client';

import { useState, useEffect } from 'react';
import { heroData } from '@/data/site-data';

export default function Hero() {
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    if (isTyping) {
      if (typedText.length < heroData[currentTextIndex].length) {
        const timeout = setTimeout(() => {
          setTypedText(heroData[currentTextIndex].substring(0, typedText.length + 1));
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(false);
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, 1500);
        return () => clearTimeout(timeout);
      }
    } else {
      if (typedText.length > 0) {
        const timeout = setTimeout(() => {
          setTypedText(heroData[currentTextIndex].substring(0, typedText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setCurrentTextIndex((currentTextIndex + 1) % heroData.length);
      }
    }
  }, [typedText, isTyping, currentTextIndex, heroData]);

  return (
    <div className='mb-16 relative'>
      <div className='absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl'></div>
      <div className='relative z-10'>
        <h1 className='text-4xl md:text-6xl font-bold mb-6 leading-tight cursor-default'>
          안녕하세요, 저는 <br />
          <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 inline-block'>
            {typedText}
          </span>
          <span className='animate-blink'>|</span>
        </h1>
        <p className='text-white/70 text-xl md:text-2xl mb-8 max-w-3xl cursor-default'>
          컴퓨터와 인간 사이의 간극을 메우는 개발자로서 복잡한 문제를 해결하고 
          사용자 경험을 향상시키는 솔루션을 만듭니다.
        </p>
      </div>
    </div>
  );
}
