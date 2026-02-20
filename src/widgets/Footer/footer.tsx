'use client';

import { useRouter } from 'next/navigation';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaRss } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';

export default function Footer() {
  const router = useRouter();

  return (
    <footer className='max-w-6xl mx-auto px-4 mt-20 mb-12 relative'>
      <div className='absolute left-0 right-0 top-0 border-t border-white/10 -mx-4 sm:-mx-6 md:-mx-8 lg:-mx-[calc((100vw-72rem)/2+1rem)]'></div>
      <div className='py-12 relative'>
        <div className='flex flex-col md:flex-row gap-6 md:items-center'>
          <p className='text-white/70 text-sm leading-relaxed cursor-default tracking-wide'>
            주소 : 서울특별시 노원구 동일로 245길 162 (문의 :{' '}
            <a className='underline hover:text-blue-400 transition-colors' href='mailto:rlatkdgns042@gmail.com'>
              rlatkdgns042@naver.com
            </a>
            ) <br />
            © {new Date().getFullYear()}.{' '}
            sanghunkim All rights reserved.
          </p>

          <div className='flex items-center md:ml-auto gap-6'>
            <a
              className='text-white/70 hover:text-white transition-colors'
              rel='noopener noreferrer'
              target='_blank'
              href='/rss'
              aria-label='RSS 피드'
            >
              <FaRss className='w-5 h-5' />
            </a>

            <a
              href='https://github.com/rlatkd'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/70 hover:text-white transition-colors'
              aria-label='GitHub 프로필'
            >
              <FaGithub className='w-5 h-5' />
            </a>

            <a
              href='https://velog.io/@kata'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/70 hover:text-white transition-colors'
              aria-label='Velog 프로필'
            >
              <SiVelog className='w-5 h-5' />
            </a>

            <a
              href='https://www.linkedin.com/in/sanghun-kim-689a03342/'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/70 hover:text-white transition-colors'
              aria-label='LinkedIn 프로필'
            >
              <FaLinkedin className='w-5 h-5' />
            </a>

            <button 
              onClick={() => router.push('/404')}
              className='text-white/70 hover:text-white transition-colors'
              aria-label='Facebook 프로필'
            >
              <FaFacebook className='w-5 h-5' />
            </button>

            <button 
              onClick={() => router.push('/404')}
              className='text-white/70 hover:text-white transition-colors'
              aria-label='Instagram 프로필'
            >
              <FaInstagram className='w-5 h-5' />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
