import Hero from '@/widgets/Hero/Hero';
import Characteristics from '@/widgets/Characteristic/Characteristic';
import Newsletter from '@/widgets/Newsletter/Newsletter';
import Timeline from '@/widgets/Timeline/Timeline';
import Achievement from '@/widgets/Achievement/Achievement';
import Technique from '@/widgets/Technique/Technique';
import Project from '@/widgets/Project/Project';
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
