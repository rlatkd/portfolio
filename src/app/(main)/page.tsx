import Sidebar from '@/widgets/Sidebar/sidebar';
import About from '@/widgets/About/about';
import Strengths from '@/widgets/Strengths/strengths';
import Experience from '@/widgets/Experience/experience';
import Projects from '@/widgets/Projects/projects';
import Skills from '@/widgets/Skills/skills';
import Writing from '@/widgets/Writing/writing';
import Contact from '@/widgets/Contact/contact';

export default function Page() {
  return (
    <div className='mx-auto max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-16 lg:px-16'>
      <Sidebar />
      <main className='lg:w-[52%] lg:py-24'>
        <About />
        <Strengths />
        <Experience />
        <Projects />
        <Skills />
        <Writing />
        <Contact />
      </main>
    </div>
  );
}
