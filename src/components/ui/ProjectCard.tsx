import { Project } from '@/types/project';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';
import { Button } from './button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

export default function ProjectCard({ project, index }: Readonly<{ project: Project; index: number }>) {
  return (
    <Card className='overflow-hidden h-full flex flex-col backdrop-blur-md bg-background/30 border-primary/20 shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl pt-0'>
      <div className='relative h-48'>
        <Image src={project.image || '/placeholder.svg'} alt={project.title} fill className='object-cover' />
        <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent' />
      </div>
      <CardHeader>
        <CardTitle className='text-primary'>{project.title}</CardTitle>
        <CardDescription className='text-primary/70'>{project.category}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow text-primary/80'>
        <p>{project.description}</p>
      </CardContent>
      <CardFooter className='flex justify-between'>
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
        <Button size='sm' asChild className='backdrop-blur-sm bg-primary/80 hover:bg-primary/90'>
          <a href={project.demo} target='_blank' rel='noopener noreferrer' className='flex items-center gap-2'>
            <ExternalLink size={16} /> Demo
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
