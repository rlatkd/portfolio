'use client';

import React from 'react';

// 기본 스켈레톤 요소 컴포넌트
export const Skeleton = ({ 
  width = '100%', 
  height = '1rem', 
  className = '',
  rounded = 'rounded-lg',
  animate = true
}) => {
  return (
    <div 
      className={`bg-white/5 ${rounded} ${animate ? 'animate-pulse' : ''} ${className}`}
      style={{ width, height }}
    ></div>
  );
};

// 텍스트 스켈레톤 (여러 줄 지원)
export const TextSkeleton = ({ 
  lines = 1, 
  widths = ['100%'], 
  height = '1rem',
  spacing = 'mb-2',
  className = ''
}) => {
  return (
    <div className={className}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton 
          key={i} 
          width={widths[i % widths.length]} 
          height={height}
          className={i < lines - 1 ? spacing : ''}
        />
      ))}
    </div>
  );
};

// 아바타/아이콘 스켈레톤
export const CircleSkeleton = ({ 
  size = '3rem', 
  className = '' 
}) => {
  return (
    <Skeleton 
      width={size} 
      height={size} 
      rounded="rounded-full"
      className={className}
    />
  );
};

// 이미지 스켈레톤
export const ImageSkeleton = ({ 
  width = '100%', 
  height = '200px', 
  className = '' 
}) => {
  return (
    <Skeleton 
      width={width} 
      height={height}
      className={className}
    />
  );
};

// 카드 스켈레톤
export const CardSkeleton = ({ 
  imageHeight = '200px',
  padding = 'p-6',
  roundedCard = 'rounded-xl',
  className = ''
}) => {
  return (
    <div className={`bg-white/5 backdrop-blur-sm ${roundedCard} overflow-hidden ${className}`}>
      <ImageSkeleton height={imageHeight} rounded="rounded-none" />
      <div className={padding}>
        <TextSkeleton lines={3} widths={['60%', '100%', '80%']} />
      </div>
    </div>
  );
};

// 사용자 정의 스켈레톤 레이아웃
export const SkeletonWrapper = ({ 
  isLoading, 
  skeleton, 
  children,
  transitionDuration = 'duration-300',
  className = ''
}) => {
  if (isLoading) {
    return skeleton;
  }
  
  return (
    <div className={`opacity-0 animate-fade-in ${transitionDuration} ${className}`}>
      {children}
    </div>
  );
};
