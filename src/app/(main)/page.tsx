import About from '@/widgets/about/about';
import Experience from '@/widgets/experience/experience';
import Tasks from '@/widgets/tasks/tasks';
import Projects from '@/widgets/projects/projects';
import Writing from '@/widgets/writing/writing';
import Contact from '@/widgets/contact/contact';
import Footer from '@/widgets/footer/footer';
import { getPosts } from '@/shared/lib/markdown';
import { serializeJsonLd } from '@/shared/lib/seo';
import { profile, majorSkills } from '@/shared/data/site-data';
import { baseUrl, authorId, siteTitle } from '@/shared/config/site';

export const revalidate = 86400;

export const metadata = {
  // sitemap과 같은 슬래시 없는 주소를 canonical로 쓴다.
  alternates: { canonical: baseUrl },
};

export default async function Page() {
  const posts = await getPosts();
  const recent = [...posts]
    .sort((a, b) => Date.parse(b.metadata.publishedAt) - Date.parse(a.metadata.publishedAt) || b.metadata.index - a.metadata.index)
    .slice(0, 5)
    .map((p) => ({
      slug: p.slug,
      title: p.metadata.title ?? '',
      category: p.metadata.category ?? '',
      publishedAt: p.metadata.publishedAt ?? '',
      summary: p.metadata.summary ?? '',
    }));

  return (
    <>
      <About />
      <Experience />
      <Tasks />
      <Projects />
      <Writing posts={recent} />
      <Contact />
      {/* 마지막 영역에서 하단 문구까지 간격을 블로그 글 상세(88px)와 맞춘다 */}
      {/* 맨 아래로 스크롤했을 때 하단 문구 아래 끝을 가림 높이(--bottom-mask, 보통 96px = main 80px + 16px)에 둔다 */}
      <div className='!mt-[89px] text-center [&>footer]:pb-4'><Footer /></div>
      {/* 검색용 구조화 데이터. 맨 앞에 두면 영역 사이 간격(space-y)이 첫 영역에 붙어 사이드바와 시작 높이가 어긋난다. */}
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          // 사이트(WebSite)·이 페이지(ProfilePage)·인물(Person)을 @id로 서로 연결한다.
          // 사이트 운영자와 페이지 주인공은 인물(김상훈)이다. 근무처(효성에프엠에스)는 인물의 worksFor일 뿐이다.
          __html: serializeJsonLd({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': `${baseUrl}/#website`,
                url: baseUrl,
                name: profile.name,
                alternateName: profile.nameEn,
                inLanguage: 'ko-KR',
                publisher: { '@id': authorId },
              },
              {
                '@type': 'ProfilePage',
                '@id': `${baseUrl}/#profile`,
                url: baseUrl,
                name: siteTitle,
                inLanguage: 'ko-KR',
                isPartOf: { '@id': `${baseUrl}/#website` },
                mainEntity: { '@id': authorId },
              },
              {
                '@type': 'Person',
                '@id': authorId,
                name: profile.name,
                alternateName: profile.nameEn,
                // 화면에 보이는 직함만 쓴다(사이드바 Software Engineer, Experience Full-stack Developer). 구글 구조화 데이터 지침.
                jobTitle: [profile.role, 'Full-stack Developer'],
                url: baseUrl,
                email: `mailto:${profile.email}`,
                worksFor: { '@type': 'Organization', name: '효성에프엠에스' },
                alumniOf: [
                  { '@type': 'CollegeOrUniversity', name: '성균관대학교' },
                  { '@type': 'CollegeOrUniversity', name: '경희대학교' },
                ],
                // experience '기술' 탭에 보이는 항목과 같게 둔다.
                knowsAbout: majorSkills.flatMap(group => group.items),
                sameAs: [profile.github, profile.linkedin, profile.velog],
              },
            ],
          }),
        }}
      />
    </>
  );
}
