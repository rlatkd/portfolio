'use client';

import { characteristicData } from '@/shared/data/site-data';

export default function Characteristics() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-16'>
      {characteristicData.map((skill, index) => (
        <SkillCard 
          key={index}
          icon={skill.icon}
          title={skill.title}
          description={skill.description}
          gradient={skill.gradient}
        />
      ))}
    </div>
  );
}

const SkillCard = ({ icon, title, description, gradient }) => {
  return (
    <div className='bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transition-all group'>
      <div className={`mb-4 p-3 bg-gradient-to-r ${gradient} rounded-lg inline-block`}>
        {icon}
      </div>
      <h3 className='text-xl font-semibold mb-2 text-white/90 cursor-default'>{title}</h3>
      <p className='text-white/70 cursor-default'>{description}</p>
    </div>
  );
};