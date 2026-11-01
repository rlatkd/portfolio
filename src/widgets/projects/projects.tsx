import { Pane } from '@/shared/ui/pane';
import { projects } from '@/shared/data/site-data';
import ProjectCarousel from './project-carousel';

export default function Projects() {
  return (
    <Pane id='projects' file='side-projects/'>
      <ProjectCarousel projects={projects} />
    </Pane>
  );
}
