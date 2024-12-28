"use client";

import { scrollEffect } from "app/utils/scrollEffect";

type ScrollProps = {
    children: React.ReactNode
};

const THRESHOLD = 0.5;

export function Scroll({ children }: ScrollProps) {
    const { isVisible, elementRef } = scrollEffect(THRESHOLD);  // 기본 threshold 0.5 사용

    return (
      <div
        ref={elementRef}
        className={`transition-opacity duration-1000 ${isVisible ? 'animate-fadeIn' : 'opacity-0'}`}
      >
        {children}
      </div>
    );
  }