import Project from '@/types/project';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

export default function ProjectCard({ project }: Readonly<{ project: Project }>) {
  return (
    <Card className='overflow-hidden h-full flex flex-col backdrop-blur-md bg-background/30 border-primary/20 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl pt-0'>
      <div className='relative h-48'>
        <Image src={project.image || '/placeholder.svg'} alt={project.title} fill className='object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent' />

        {project.aiImage && (
          <div
            title='This image is generated using AI.'
            className='opacity-70 absolute top-0 right-5 bg-primary-foreground px-2 py-1 text-sm font-semibold text-primary shadow-md rounded-b-md'
          >
            <Sparkles size={16} />
          </div>
        )}
      </div>

      <CardHeader>
        <CardTitle className='text-primary'>{project.title}</CardTitle>
        <CardDescription className='text-primary/70'>{project.category}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow text-primary/80'>
        <p>{project.description}</p>

        {/* Add tags section */}
        {project.tags?.length ? (
          <div className='flex flex-wrap gap-2 mt-4'>
            {project.tags.map((tag, index) => (
              <span key={index} className='px-2 py-1 text-xs rounded-full bg-primary/10 text-primary/70'>
                {tag}
              </span>
            ))}
          </div>
        ) : null}
      </CardContent>
      <CardFooter className='flex justify-between'>
        {project.github ? (
          <Button
            variant='outline'
            size='sm'
            asChild
            className='backdrop-blur-sm bg-background/50 border-primary/30 hover:bg-background/70'
          >
            <a href={project.github} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
              <Github size={16} /> Code
            </a>
          </Button>
        ) : (
          <div></div>
        )}
        {project.demo ? (
          <Button size='sm' asChild className='backdrop-blur-sm bg-primary/80 hover:bg-primary/90'>
            <a href={project.demo} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
              <ExternalLink size={16} /> Demo
            </a>
          </Button>
        ) : (
          <div></div>
        )}
      </CardFooter>
    </Card>
  );
}
