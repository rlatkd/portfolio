'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null); // null, 'success', 'error', 'loading'
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    
    setStatus('loading');
    
    // 서버 요청을 시뮬레이션하는 타임아웃
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      
      // 성공 메시지를 3초 후에 지움
      setTimeout(() => {
        setStatus(null);
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className='mb-20 relative'>
      <div className='absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-r from-blue-400/20 to-green-400/20 rounded-full blur-3xl'></div>
      
      <div className='bg-white/5 backdrop-blur-sm rounded-xl p-8 relative overflow-hidden'>
        <div className='absolute top-0 right-0 w-40 h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2'></div>
        
        <div className='relative z-10'>
          <div className='w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-6'>
            <Mail className='w-6 h-6 text-blue-400' />
          </div>
          
          <h2 className='text-2xl font-bold text-white/90 mb-2'>최신 소식 구독하기</h2>
          <p className='text-white/70 mb-6'>새로운 프로젝트와 개발 인사이트를 메일로 받아보세요.</p>
          
          <form onSubmit={handleSubmit} className='relative'>
            <div className='flex flex-col md:flex-row gap-4'>
              <input
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder='이메일 주소를 입력하세요'
                className={`bg-white/10 rounded-lg px-4 py-3 text-white/90 placeholder:text-white/50 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400/50 ${
                  status === 'error' ? 'ring-2 ring-red-400/50' : ''
                }`}
                disabled={status === 'loading' || status === 'success'}
              />
              
              <button
                type='submit'
                disabled={status === 'loading' || status === 'success'}
                className={`rounded-lg px-6 py-3 flex items-center justify-center text-white transition-all focus:outline-none focus:ring-2 focus:ring-white/20 ${
                  status === 'loading'
                    ? 'bg-white/20 cursor-wait'
                    : status === 'success'
                    ? 'bg-green-500 hover:bg-green-600'
                    : 'bg-blue-500 hover:bg-blue-600'
                }`}
              >
                {status === 'loading' ? (
                  <div className='w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin'></div>
                ) : status === 'success' ? (
                  '구독 완료!'
                ) : (
                  <>
                    구독하기 <Send className='ml-2 w-4 h-4' />
                  </>
                )}
              </button>
            </div>
            
            {status === 'error' && (
              <p className='text-red-400 text-sm mt-2'>유효한 이메일 주소를 입력해주세요.</p>
            )}
            
            {status === 'success' && (
              <p className='text-green-400 text-sm mt-2'>구독이 완료되었습니다! 이메일을 확인해주세요.</p>
            )}
          </form>
          
          <p className='text-white/50 text-xs mt-4'>
            * 구독은 언제든지 취소 가능하며, 개인정보는 보호됩니다.
          </p>
        </div>
      </div>
    </div>
  );
}
