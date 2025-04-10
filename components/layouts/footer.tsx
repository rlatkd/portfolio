'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaFacebook, FaGithub, FaInstagram, FaLinkedin, FaRss } from 'react-icons/fa';
import { SiVelog } from 'react-icons/si';

export default function Footer() {
  const router = useRouter();

  return (
    <>
      <div className='w-screen relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] mt-20'></div>
      <footer className='flex flex-col mt-16 mb-20'>
        <div className='flex flex-row gap-4'>
          <p className='text-white/70 text-sm leading-relaxed cursor-default tracking-wide'>
            주소 : 서울특별시 노원구 동일로 245길 162 (문의 :{' '}
            <a className='underline' href='mailto:rlatkdgns042@gmail.com'>
              rlatkdgns042@gmail.com
            </a>
            ) <br />
            © {new Date().getFullYear()}.{' '}
            <span className='inline-flex items-center'>
              <img
                src='/logo.svg'
                alt='Logo'
                className='h-4 w-auto -mr-0.5 inline-block translate-y-[3.5px]'
              />
              <span className='font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 tracking-wider translate-y-[3px] '>
                Ops
              </span>
            </span>{' '}
            All rights reserved.
          </p>

          <div className='flex items-center flex-row ml-auto gap-10'>
            <a
              className='flex items-center gap-1'
              rel='noopener noreferrer'
              target='_blank'
              href='/rss'
            >
              <FaRss className='w-5 h-5 opacity-80 hover:opacity-100 transition-opacity' />
            </a>

            <a
              href='https://github.com/rlatkd'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaGithub className='w-6 h-6 opacity-80 hover:opacity-100 transition-opacity' />
            </a>

            <a
              href='https://velog.io/@kata'
              target='_blank'
              rel='noopener noreferrer'
            >
              <SiVelog className='w-6 h-6 opacity-80 hover:opacity-100 transition-opacity' />
            </a>

            <a
              href='https://www.linkedin.com/in/sanghun-kim-689a03342/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <FaLinkedin className='w-7 h-7 opacity-80 hover:opacity-100 transition-opacity' />
            </a>

            <button onClick={() => router.push('/404')}>
              <FaFacebook className='w-6 h-6 opacity-80 hover:opacity-100 transition-opacity' />
            </button>

            <button onClick={() => router.push('/404')}>
              <FaInstagram className='w-7 h-7 opacity-80 hover:opacity-100 transition-opacity' />
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
