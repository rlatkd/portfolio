import Link from 'next/link';
import { profile, aboutIntro, experience, education, skillGroups, certifications } from '@/shared/data/site-data';
import { PrintResume } from '@/features/PrintResume/PrintResume';

export const metadata = {
  title: '이력서', description: '금융 채널 풀스택 개발자 김상훈의 경력과 프로젝트 요약입니다.',
  alternates: { canonical: '/resume' },
};
export default function Resume() {
  return <main className='resume mx-auto w-full max-w-4xl px-6 py-12'>
    <div className='print-hidden mb-8 flex flex-wrap justify-between gap-4'><Link href='/'>← 포트폴리오</Link><PrintResume /></div>
    <h1 className='text-3xl font-bold'>{profile.name} · {profile.role}</h1>
    <p className='mt-3'><a href={`mailto:${profile.email}`}>{profile.email}</a> · {profile.location}</p>
    <p><a href={profile.github}>{profile.githubLabel}</a> · <a href={profile.velog}>{profile.velogLabel}</a></p>
    <p className='mt-6'>{aboutIntro[0]}</p>
    <h2 className='mb-4 mt-10 text-2xl font-bold'>경력 · 프로젝트 경험</h2>
    {experience.slice(1, 4).map(item => <section key={item.role} className='mb-8'>
      <h3 className='text-lg font-bold'>{item.role}</h3><p className='text-sm text-muted'>{item.period} · {item.org}</p>
      <p className='mt-2'>{item.desc}</p><ul className='mt-2 list-disc pl-5'>{item.points.map(point => <li key={point}>{point}</li>)}</ul>
    </section>)}
    <section><h2 className='mb-4 mt-10 text-2xl font-bold'>학력</h2>{education.map(item => <p key={item.org} className='mb-3'>{item.period} · {item.org}<br />{item.detail}</p>)}</section>
    <section><h2 className='mb-4 mt-10 text-2xl font-bold'>기술</h2>{skillGroups.map(group => <p key={group.label}><strong>{group.label}</strong> · {group.items.join(', ')}</p>)}</section>
    <section><h2 className='mb-4 mt-10 text-2xl font-bold'>자격</h2>{certifications.map(item => <p key={item.id}>{item.name} · {item.date} · {item.org}</p>)}</section>
    <p className='mt-10 text-sm text-muted'>포트폴리오의 공개 경력 데이터를 공유하는 요약본입니다. 전화번호·상세 주소·자격증 식별번호는 포함하지 않습니다.</p>
  </main>;
}
