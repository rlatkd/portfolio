"use client"

import { useState, useEffect, useRef } from 'react';

export const scrollEffect = (threshold) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !isVisible) { // 처음 화면에 보일 때만
          setIsVisible(true);
        }
      },
      {
        threshold,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold, isVisible]); // isVisible 의 변화에 따라 observer가 영향을 받지 않도록 설정

  return { isVisible, elementRef };
}
