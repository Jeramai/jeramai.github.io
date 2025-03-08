'use client';

import projects from '@/lib/projects';
import { useCallback, useState } from 'react';
import ProjectCard from '../ui/ProjectCard';

export default function Projects() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [visibleProjects, setVisibleProjects] = useState(3);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const deltaX = x - centerX;
    const deltaY = y - centerY;

    setMousePosition({
      x: deltaX,
      y: deltaY
    });
  }, []);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleLoadMore = () => {
    setVisibleProjects((prev) => Math.min(prev + 3, projects.length));
  };
  const showLoadMoreButton = visibleProjects < projects.length;

  return (
    <section id='projects' className='py-20 relative overflow-hidden'>
      <div className='container mx-auto px-4 relative z-10'>
        <h2 className='text-3xl md:text-4xl font-bold mb-12 text-center text-primary'>My Projects</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {projects.slice(0, visibleProjects).map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}

          {visibleProjects >= projects?.length ? (
            <div
              className='relative flex h-full items-center justify-center p-6 bg-gray-100 dark:bg-gray-800/10 rounded-lg shadow-md overflow-hidden group h-[200px] hover:scale-[1.02] hover:shadow-xl duration-300 border border-primary/20'
              onPointerMove={handleMouseMove}
              onPointerEnter={handleMouseEnter}
              onPointerLeave={handleMouseLeave}
            >
              <div
                className={`absolute bg-primary/10 w-32 h-32 rounded-full blur-xl transition-all duration-500 ease-out -z-10
                ${isHovered ? 'opacity-100' : 'opacity-0'}`}
                style={{
                  transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                  willChange: 'transform'
                }}
              />
              <h3 className='text-xl font-semibold text-center text-primary select-none'>And many more...</h3>
            </div>
          ) : null}
        </div>
        {showLoadMoreButton && (
          <div className='mt-6 flex justify-center'>
            <button
              className='flex h-full items-center justify-center p-6 bg-gray-100 dark:bg-gray-800/10 rounded-lg shadow-md overflow-hidden group hover:scale-[1.02] hover:shadow-xl duration-300 border border-primary/20 cursor-pointer'
              onClick={handleLoadMore}
            >
              <h3 className='text-xl font-semibold text-center text-primary select-none'>Load More Projects</h3>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
