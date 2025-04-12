import Hero from '@/components/layouts/home/hero';
import Blog from '@/components/layouts/home/blog';
import Carousel from '@/components/layouts/home/carousel';
import Skills from '@/components/layouts/home/skills';
import CTA from '@/components/layouts/home/cta';

export default function Page() {
  return (
    <>
      <section>
        <div className='max-w-4xl mx-auto'>
          <Hero />
          <Skills />
          <Blog />
          <Carousel />
          {/* <CTA /> */}
        </div>
      </section>
    </>
  );
}
