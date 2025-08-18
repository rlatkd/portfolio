'use client';

import { useState, useEffect, useRef } from 'react';

// IntersectionObserver를 쉽게 사용하기 위한 커스텀 훅
export default function useIntersectionObserver(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const ref = useRef(null);
  
  // 기본 옵션 값 설정
  const defaultOptions = {
    threshold: 0.1,
    once: true, // 한 번만 감지할지 여부
    rootMargin: '0px', // 뷰포트와의 마진
  };
  
  // 사용자 옵션과 기본 옵션 병합
  const observerOptions = {
    ...defaultOptions,
    ...options,
  };
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  useEffect(() => {
    if (!isMounted) return;
    
    const { threshold, once, rootMargin } = observerOptions;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // once가 true이면 감지 후 observer 연결 해제
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          // once가 false이면 요소가 화면에서 벗어날 때 isVisible을 false로 변경
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );
    
    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isMounted, observerOptions]);
  
  return { ref, isVisible, isMounted };
}
