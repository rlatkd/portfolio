'use client';

import { useState } from 'react';
import { Calendar } from 'lucide-react';
import { timelineData } from '@/shared/data/site-data';

export default function Timeline() {
  const [activeItem, setActiveItem] = useState(null);
  
  return (
    <div className='mb-20 relative'>
      <div className='absolute -bottom-20 -right-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl'></div>
      
      <div className='flex justify-between items-center mb-8'>
        <h2 className='text-2xl font-bold text-white/90 cursor-default'>타임라인</h2>
      </div>
      
      <div className='relative z-10'>
        <div className='absolute left-8 top-6 bottom-6 w-px bg-white/10'></div>
        
        <div className='space-y-10'>
          {timelineData.map((item, index) => (
            <div 
              key={index}
              className='relative pl-16'
              onMouseEnter={() => setActiveItem(index)}
              onMouseLeave={() => setActiveItem(null)}
            >
              <div className={`absolute left-0 top-0 w-16 h-16 rounded-full bg-gradient-to-r ${item.gradient} flex items-center justify-center transition-all duration-300 ${activeItem === index ? 'scale-110' : ''}`}>
                {item.icon}
              </div>
              
              <div className='bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all'>
                <div className='flex flex-col md:flex-row md:justify-between md:items-center mb-3'>
                  <h3 className='text-xl font-semibold text-white/90 cursor-default'>{item.title}</h3>
                  <div className='flex items-center text-white/60 text-sm mt-2 md:mt-0 cursor-default'>
                    <Calendar className='w-4 h-4 mr-1' />
                    <span>{item.period}</span>
                  </div>
                </div>
                
                <p className='text-white/70 font-medium mb-2 cursor-default'>{item.organization}</p>
                <p className='text-white/70 cursor-default'>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
