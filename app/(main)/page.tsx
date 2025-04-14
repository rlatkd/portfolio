import Hero from '@/components/layouts/home/hero';
import Skills from '@/components/layouts/home/skills';
import RecentPosts from '@/components/layouts/home/recent-posts';
import ProjectCarousel from '@/components/layouts/home/project-carousel';
import Newsletter from '@/components/layouts/home/newsletter';
import Timeline from '@/components/layouts/home/timeline';
import AchievementCounter from '@/components/layouts/home/achievement-counter';
import TechStack from '@/components/layouts/home/tech-stack';

export default function Page() {
  return (
    <>
      <section>
        <div className='max-w-4xl mx-auto'>
          <Hero />
          <Skills />
          <AchievementCounter />
          <Timeline />
          <TechStack />
          <RecentPosts />
          <ProjectCarousel />
          <Newsletter />
          {/* <CTA /> */}
        </div>
      </section>
    </>
  );
}
