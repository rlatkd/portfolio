'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function CTA({ 
  title = '함께 무언가를 만들어볼까요?', 
  description = '흥미로운 프로젝트가 있으시거나 협업에 관심이 있으신가요? 언제든지 연락주세요.',
  buttonText = '연락하기',
  buttonLink = '/contact'
}) {
  return (
    <div className='relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 rounded-2xl overflow-hidden'>
      <div className='absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl'></div>
      <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl'></div>
      <div className='relative z-10'>
        <h2 className='text-2xl md:text-3xl font-bold mb-4 text-white/90 cursor-default'>{title}</h2>
        <p className='text-white/70 mb-6 max-w-2xl cursor-default'>{description}</p>
        <Link href={buttonLink} className='px-6 py-3 bg-white/90 text-black rounded-lg font-medium inline-flex items-center hover:bg-white transition-all'>
          {buttonText} <ArrowRight className='ml-2 w-4 h-4' />
        </Link>
      </div>
    </div>
  );
}
