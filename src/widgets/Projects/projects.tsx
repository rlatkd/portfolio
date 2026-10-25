import { Section } from '@/shared/ui/Section';
import { projects } from '@/shared/data/site-data';
import ProjectCarousel from './ProjectCarousel';

export default function Projects() {
  return (
    <Section id='projects' label='Side Projects'>
      <ProjectCarousel projects={projects} />
    </Section>
  );
}
