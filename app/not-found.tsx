'use client';

import '@/styles/global.css';

export default function NotFound() {
  return (
    <div className='flex items-center justify-center w-full min-h-screen py-8 md:py-16'>
      <div className='relative flex flex-col items-center w-full gap-8 px-8 md:px-18 xl:px-40 md:gap-16'>
        <h1 className='text-9xl md:text-[300px] w-full select-none text-center font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 tracking-wider'>
          404
        </h1>
        <p className='text-3xl font-bold capitalize text-white'>페이지를 찾을 수 없습니다.</p>
        <p className='text-2xl font-light tracking-wide break-words text-white/70 text-center'>
          존재하지 않는 주소를 입력하셨거나
          <br />
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </p>
        <div className='flex flex-col justify-between w-full gap-8 md:flex-row md:gap-8 xl:px-16 mt-4'>
          <button
            onClick={() => window.history.back()} 
            className='flex items-center justify-center w-full md:w-1/2 gap-4 p-4 font-medium tracking-wide bg-black text-white border border-blue-500/30 hover:border-blue-500 rounded-full transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95'
          >
            이전 페이지로
          </button>
          <a
            href='/'
            className='flex items-center justify-center w-full md:w-1/2 gap-4 p-4 font-medium tracking-wide bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus:outline-none hover:scale-105 active:scale-95'
          >
            홈으로
          </a>
        </div>
      </div>
    </div>
  );
}
