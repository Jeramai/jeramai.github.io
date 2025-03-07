import projects from '@/lib/projects';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  return (
    <section id='projects' className='py-20 relative overflow-hidden'>
      <div className='container mx-auto px-4 relative z-10'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12 text-center text-primary'>My Projects</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
