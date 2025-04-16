import Hero from '@/components/layouts/home/hero';
import Characteristics from '@/components/layouts/home/characteristic';
import Newsletter from '@/components/layouts/home/newsletter';
import Timeline from '@/components/layouts/home/timeline';
import Achievement from '@/components/layouts/home/achievement';
import Technique from '@/components/layouts/home/technique';
import Project from '@/components/layouts/home/project';
import Post from '@/components/layouts/home/recent-posts';

export default function Page() {
  return (
    <>
      <section>
        <div className='max-w-4xl mx-auto'>
          <Hero />
          <Characteristics />
          <Achievement />
          <Timeline />
          <Technique />
          <Post />
          <Project />
          <Newsletter />
          {/* <CTA /> */}
        </div>
      </section>
    </>
  );
}
