'use client';

import { Top } from '@/components/layouts/top';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, Code, Pencil, Sparkles } from 'lucide-react';

export default function Page() {
  const [typedText, setTypedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  
  const textOptions = [
    "개발자.",
    "문제 해결사.",
    "경험 디자이너.",
    "지속적 학습자."
  ];

  useEffect(() => {
    if (isTyping) {
      if (typedText.length < textOptions[currentTextIndex].length) {
        const timeout = setTimeout(() => {
          setTypedText(textOptions[currentTextIndex].substring(0, typedText.length + 1));
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
          setTypedText(textOptions[currentTextIndex].substring(0, typedText.length - 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setIsTyping(true);
        setCurrentTextIndex((currentTextIndex + 1) % textOptions.length);
      }
    }
  }, [typedText, isTyping, currentTextIndex, textOptions]);

  return (
    <>
      <section>
        <div className="max-w-4xl mx-auto">
          {/* 히어로 섹션 */}
          <div className="mb-16 relative">
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight cursor-default">
                안녕하세요, 저는 <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 inline-block">
                  {typedText}
                </span>
                <span className="animate-blink">|</span>
              </h1>
              <p className="text-white/70 text-xl md:text-2xl mb-8 max-w-3xl cursor-default">
                컴퓨터와 인간 사이의 간극을 메우는 개발자로서 복잡한 문제를 해결하고 
                사용자 경험을 향상시키는 솔루션을 만듭니다.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/projects" className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium flex items-center justify-center group hover:opacity-95 transition-all">
                  프로젝트 살펴보기
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/about" className="px-6 py-3 bg-white/10 rounded-lg font-medium hover:bg-white/15 transition-all">
                  더 알아보기
                </Link>
              </div>
            </div>
          </div>
          
          {/* 소개 카드 섹션 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all group">
              <div className="mb-4 p-3 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-lg inline-block">
                <Code className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white/90 cursor-default">개발 & 기술</h3>
              <p className="text-white/70 cursor-default">최신 웹 기술과 프레임워크를 활용한 확장 가능한 솔루션 구축</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all group">
              <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg inline-block">
                <Pencil className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white/90 cursor-default">디자인 & UX</h3>
              <p className="text-white/70 cursor-default">사용자 중심의 직관적이고 접근성 높은 인터페이스 설계</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all group">
              <div className="mb-4 p-3 bg-gradient-to-r from-green-500/20 to-green-600/20 rounded-lg inline-block">
                <Sparkles className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white/90 cursor-default">혁신 & 창의성</h3>
              <p className="text-white/70 cursor-default">문제에 대한 창의적 접근과 지속적인 학습으로 혁신적 솔루션 제공</p>
            </div>
          </div>
          
          {/* 최근 프로젝트 또는 블로그 */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-white/90 cursor-default">최근 프로젝트</h2>
              <Link href="/projects" className="text-blue-400 hover:text-blue-300 flex items-center">
                모두 보기 <ArrowRight className="ml-1 w-4 h-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all">
                <div className="aspect-video bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <Code className="w-16 h-16" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white/90 cursor-default">AI 기반 데이터 분석 플랫폼</h3>
                  <p className="text-white/70 mb-4 cursor-default">머신러닝을 활용한 데이터 분석과 시각화를 위한 웹 애플리케이션</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 cursor-default">React</span>
                    <span className="text-xs px-3 py-1 bg-green-500/20 rounded-full text-green-300 cursor-default">TensorFlow</span>
                    <span className="text-xs px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 cursor-default">Python</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all">
                <div className="aspect-video bg-gradient-to-r from-green-900 to-blue-900 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-white/50">
                    <Pencil className="w-16 h-16" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white/90 cursor-default">분산 시스템 모니터링 대시보드</h3>
                  <p className="text-white/70 mb-4 cursor-default">실시간 시스템 모니터링을 위한 확장 가능한 대시보드 솔루션</p>
                  <div className="flex gap-2">
                    <span className="text-xs px-3 py-1 bg-cyan-500/20 rounded-full text-cyan-300 cursor-default">Next.js</span>
                    <span className="text-xs px-3 py-1 bg-orange-500/20 rounded-full text-orange-300 cursor-default">GraphQL</span>
                    <span className="text-xs px-3 py-1 bg-blue-500/20 rounded-full text-blue-300 cursor-default">TypeScript</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* CTA 섹션 */}
          <div className="relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 rounded-2xl overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white/90 cursor-default">함께 무언가를 만들어볼까요?</h2>
              <p className="text-white/70 mb-6 max-w-2xl cursor-default">
                흥미로운 프로젝트가 있으시거나 협업에 관심이 있으신가요? 언제든지 연락주세요.
              </p>
              <Link href="/contact" className="px-6 py-3 bg-white/90 text-black rounded-lg font-medium inline-flex items-center hover:bg-white transition-all">
                연락하기 <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
