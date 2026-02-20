// import { Projects } from '@/components/ui/projects';
// import { getProjects } from '@/lib/markdown';

// const POSTS_PER_PAGE = 5; // 게시글 랜더링 수

// type PageProps = {
//   searchParams: {
//     page?: string;
//   };
// };

// export default async function Page({ searchParams }: PageProps) {
//   const sortedProjects = await getProjects();
//   const totalPosts = sortedProjects.length; // 총 게시글 수
//   const lastPage = Math.ceil(totalPosts / POSTS_PER_PAGE); // 마지막 페이지
//   const currentPage = parseInt(searchParams.page || '1', 10); // 현재 페이지
//   const startIndex = (currentPage - 1) * POSTS_PER_PAGE; // 시작 게시글 번호(페이지당)
//   const endIndex = startIndex + POSTS_PER_PAGE; // 끝 게시글 번호(페이지당)
//   const currentPosts = sortedProjects.slice(startIndex, endIndex); // 현재 게시글들

//   return (
//     <>
//       This is projects
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { Filter, Code, Briefcase, GraduationCap, ArrowRight, LucideIcon } from 'lucide-react';
import { projectData } from '@/shared/data/site-data';
import Link from 'next/link';

const categories = [
  { id: 'all', name: '전체', icon: Filter },
  { id: 'team', name: '팀 프로젝트', icon: Briefcase },
  { id: 'personal', name: '개인 프로젝트', icon: Code },
  { id: 'academic', name: '학습 프로젝트', icon: GraduationCap }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectData);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  useEffect(() => {
    if (selectedCategory === 'all') {
      setFilteredProjects(projectData);
    } else {
      setFilteredProjects(projectData.filter(project => 
        project.category?.toLowerCase() === selectedCategory
      ));
    }
  }, [selectedCategory]);

  const getCategoryColor = (category) => {
    const colorMap = {
      'team': { bg: 'from-blue-500/30 to-purple-500/30', text: 'text-blue-400', badge: 'bg-blue-400/20' },
      'personal': { bg: 'from-purple-500/30 to-blue-500/30', text: 'text-purple-400', badge: 'bg-purple-400/20' },
      'academic': { bg: 'from-green-500/30 to-blue-500/30', text: 'text-green-400', badge: 'bg-green-400/20' },
      'default': { bg: 'from-orange-500/30 to-purple-500/30', text: 'text-orange-400', badge: 'bg-orange-400/20' }
    };
    
    return colorMap[category?.toLowerCase()] || colorMap.default;
  };

  // 프로젝트 클릭 처리
  const handleProjectClick = (project) => {
    console.log(`프로젝트 클릭: ${project.title}`);
    // TODO: 프로젝트 상세 페이지로 이동
  };

  const specialProject = projectData[0];
  const specialProjectColor = getCategoryColor(specialProject.category);

  return (
    <section className='max-w-4xl mx-auto px-4 md:px-0'>
      <div className='mb-16 relative'>
        <div className='absolute -top-20 -left-20 w-60 h-60 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl'></div>
        <div className='relative z-10'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-white/90 cursor-default'>프로젝트</h1>
          <p className='text-white/70 text-xl mb-10 max-w-3xl cursor-default'>
            다양한 환경에서 개발한 프로젝트들을 소개합니다. 웹 애플리케이션부터 모바일, 백엔드 시스템까지 다양한 영역을 경험해 왔습니다.
          </p>
        </div>
      </div>
      <div className='flex flex-wrap gap-3 mb-12 items-center justify-center md:justify-start'>
        <div className='relative z-10 flex flex-wrap gap-3'>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-5 py-2.5 rounded-full flex items-center justify-center transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium shadow-md shadow-blue-500/20'
                    : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white backdrop-blur-sm border border-white/10'
                }`}
              >
                <Icon className='w-4 h-4 mr-2' />
                {category.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className='mb-16'>
        <div 
          className='w-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all cursor-pointer border border-white/10'
          onClick={() => handleProjectClick(specialProject)}
          onMouseEnter={() => setHoveredProject('special')}
          onMouseLeave={() => setHoveredProject(null)}
        >
          <div className='md:flex'>
            <div className={`md:w-1/2 aspect-video md:aspect-auto bg-gradient-to-r ${specialProjectColor.bg} relative overflow-hidden`}>
              <div className='absolute inset-0 flex items-center justify-center text-white/30 text-8xl'>
                {specialProject.icon}
              </div>
              {hoveredProject === 'special' && (
                <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center'>
                  <span className='bg-white/90 text-gray-900 px-4 py-2 rounded-lg font-medium'>
                    자세히 보기
                  </span>
                </div>
              )}
            </div>
            <div className='md:w-1/2 p-8 flex flex-col justify-center'>
              <div className='mb-3'>
                <span className={`text-xs px-3 py-1 rounded-full ${specialProjectColor.badge} ${specialProjectColor.text}`}>
                  {specialProject.category || '프로젝트'}
                </span>
                {specialProject.status && (
                  <span className='ml-2 text-xs px-3 py-1 rounded-full bg-blue-500/40 text-blue-300'>
                    {specialProject.status}
                  </span>
                )}
              </div>
              <h2 className='text-2xl font-bold mb-4 text-white/90 group-hover:text-white transition-colors'>{specialProject.title}</h2>
              <p className='text-white/70 mb-6'>{specialProject.description}</p>
              <div className='flex flex-wrap gap-2 mb-6'>
                {specialProject.tags && specialProject.tags.map((tag, tagIdx) => (
                  <span 
                    key={tagIdx} 
                    className={`text-xs px-2 py-1 ${tag.className || 'bg-white/10 text-white/70'} cursor-default`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
              <button className='self-start px-4 py-2 bg-white/10 rounded-lg hover:bg-white/15 transition-all text-white/90 flex items-center group'>
                프로젝트 살펴보기
                <ArrowRight className='ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform' />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 mb-16'>
        {filteredProjects.slice(1).map((project, idx) => {
          const colorStyle = getCategoryColor(project.category);
          return (
            <div 
              key={idx}
              className='w-full bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden group hover:bg-white/10 transition-all h-full cursor-pointer border border-white/10'
              onClick={() => handleProjectClick(project)}
              onMouseEnter={() => setHoveredProject(`grid-${idx}`)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className={`aspect-video bg-gradient-to-r ${colorStyle.bg} relative overflow-hidden`}>
                <div className='absolute inset-0 flex items-center justify-center text-white/30 text-5xl'>
                  {project.icon}
                </div>
                {hoveredProject === `grid-${idx}` && (
                  <div className='absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 flex items-center justify-center'>
                    <span className='bg-white/90 text-gray-900 px-3 py-1.5 rounded-lg font-medium text-sm'>
                      자세히 보기
                    </span>
                  </div>
                )}
              </div>
              <div className='p-6'>
                <div className='mb-3 flex flex-wrap gap-2'>
                  <span className={`text-xs px-3 py-1 rounded-full ${colorStyle.badge} ${colorStyle.text}`}>
                    {project.category || '프로젝트'}
                  </span>
                  {project.status && (
                    <span className='text-xs px-3 py-1 rounded-full bg-blue-500/40 text-blue-300'>
                      {project.status}
                    </span>
                  )}
                </div>
                <h3 className='text-xl font-semibold mb-2 text-white/90 group-hover:text-white transition-colors'>{project.title}</h3>
                <p className='text-white/70 mb-4 line-clamp-2'>{project.description}</p>
                <div className='flex flex-wrap gap-2'>
                  {project.tags && project.tags.slice(0, 5).map((tag, tagIdx) => (
                    <span 
                      key={tagIdx} 
                      className={`text-xs px-2 py-1 ${tag.className || 'bg-white/10 text-white/70'} cursor-default`}
                    >
                      {tag.name}
                    </span>
                  ))}
                  {project.tags && project.tags.length > 5 && (
                    <span className='text-xs px-2 py-1 bg-white/10 text-white/70 cursor-default'>
                      +{project.tags.length - 5}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className='relative bg-gradient-to-r from-blue-900/40 to-purple-900/40 p-8 rounded-2xl overflow-hidden'>
        <div className='absolute -top-10 -right-10 w-40 h-40 bg-purple-500/30 rounded-full blur-3xl'></div>
        <div className='absolute -bottom-20 -left-20 w-60 h-60 bg-blue-500/30 rounded-full blur-3xl'></div>
        <div className='relative z-10'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4 text-white/90 cursor-default'>함께 작업해보고 싶으신가요?</h2>
          <p className='text-white/70 mb-6 max-w-2xl cursor-default'>
            새로운 프로젝트 아이디어가 있거나 기존 프로젝트에 대해 궁금한 점이 있으시면 언제든지 연락주세요.
          </p>
          <Link href='/contact' className='px-6 py-3 bg-white/90 text-black rounded-lg font-medium inline-flex items-center hover:bg-white transition-all'>
            연락하기 <ArrowRight className='ml-2 w-4 h-4' />
          </Link>
        </div>
      </div>
    </section>
  );
}
