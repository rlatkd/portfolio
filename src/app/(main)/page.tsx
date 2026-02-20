import Hero from '@/widgets/Hero/hero';
import Characteristics from '@/widgets/Characteristic/characteristic';
import Newsletter from '@/widgets/Newsletter/newsletter';
import Timeline from '@/widgets/Timeline/timeline';
import Achievement from '@/widgets/Achievement/Achievement';
import Technique from '@/widgets/Technique/technique';
import Project from '@/widgets/Project/project';
import Post from '@/widgets/RecentPosts/RecentPosts';

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
