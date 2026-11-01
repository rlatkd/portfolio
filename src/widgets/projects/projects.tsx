import { Section } from '@/shared/ui/section';
import { projects } from '@/shared/data/site-data';
import ProjectCarousel from './project-carousel';

export default function Projects() {
  return (
    <Section id='projects' label='Side Projects'>
      <ProjectCarousel projects={projects} />
    </Section>
  );
}
