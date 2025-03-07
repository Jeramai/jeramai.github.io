'use client';

import { Button } from '@/components/ui/button';
import ProjectCard from '@/components/ui/ProjectCard';
import Skill from '@/components/ui/Skill';
import SocialLink from '@/components/ui/SocialLink';
import WaterSurface from '@/components/WaterSurface';
import projects from '@/lib/projects';
import { Environment, Preload, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const experienceYears = new Date().getFullYear() - 2018;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col'>
      {/* Navigation */}
      <header className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/30 border-b border-primary/20'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <Link href='/' className='text-xl font-bold text-primary'>
            Jeram.ai
          </Link>

          {/* Mobile menu button */}
          <button className='md:hidden p-2' onClick={toggleMenu} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
            {isMenuOpen ? <X size={24} className='text-primary' /> : <Menu size={24} className='text-primary' />}
          </button>

          {/* Desktop navigation */}
          <nav className='hidden md:flex items-center space-x-8'>
            <Link href='#hero' className='text-primary/80 hover:text-primary transition-colors'>
              Home
            </Link>
            <Link href='#projects' className='text-primary/80 hover:text-primary transition-colors'>
              Projects
            </Link>
            <Link href='#about' className='text-primary/80 hover:text-primary transition-colors'>
              About
            </Link>
            <Link href='#contact' className='text-primary/80 hover:text-primary transition-colors'>
              Contact
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className='md:hidden backdrop-blur-md bg-background/50 border-b border-primary/20'>
            <div className='container mx-auto px-4 py-4 flex flex-col space-y-4'>
              <Link href='#hero' className='text-primary/80 hover:text-primary transition-colors' onClick={toggleMenu}>
                Home
              </Link>
              <Link href='#projects' className='text-primary/80 hover:text-primary transition-colors' onClick={toggleMenu}>
                Projects
              </Link>
              <Link href='#about' className='text-primary/80 hover:text-primary transition-colors' onClick={toggleMenu}>
                About
              </Link>
              <Link href='#contact' className='text-primary/80 hover:text-primary transition-colors' onClick={toggleMenu}>
                Contact
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with 3D */}
      <section id='hero' className='w-full h-screen pt-16 relative overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <Canvas camera={{ position: [0, 0.35, 5], fov: 75 }}>
            <Preload all />

            <Suspense fallback={null}>
              <WaterSurface />
            </Suspense>

            {/* Dark sky */}
            <Environment
              background
              files={[
                '/cubemap/right.jpg',
                '/cubemap/left.jpg',
                '/cubemap/top.jpg',
                '/cubemap/bot.jpg',
                '/cubemap/front.jpg',
                '/cubemap/back.jpg'
              ]}
            />
          </Canvas>
        </div>
        <div className='absolute inset-0 flex items-center justify-center flex-col text-center z-10 pointer-events-none'>
          <div className='backdrop-blur-md bg-background/30 p-8 rounded-lg max-w-2xl pointer-events-auto border border-primary/20 shadow-lg'>
            <h1 className='text-4xl md:text-6xl font-bold mb-4 text-primary'>Jeramai Faber</h1>
            <h2 className='text-xl md:text-2xl text-primary/80 mb-6'>Full Stack Developer</h2>
            <p className='text-lg mb-8 text-primary/70'>Creating beautiful, functional, and accessible web experiences.</p>
            <div className='flex justify-center gap-4'>
              <Button asChild className='backdrop-blur-sm bg-primary/80 hover:bg-primary/90'>
                <Link href='#projects'>View Projects</Link>
              </Button>
              <Button
                variant='outline'
                asChild
                className='backdrop-blur-sm bg-background/50 border-primary/30 hover:bg-background/70'
              >
                <Link href='#contact'>Contact Me</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Add a pseudo-element for the shadow */}
        <div className='absolute inset-x-0 bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#030712] to-transparent z-20 h-[100px]'></div>
      </section>

      {/* Projects Section */}
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

      {/* About Section */}
      <section id='about' className='py-20 relative overflow-hidden'>
        <div className='container mx-auto px-4'>
          <div className='flex flex-col lg:flex-row items-center gap-12'>
            <div className='lg:w-1/3'>
              <div className='relative w-64 h-64 mx-auto'>
                <div className='absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 to-primary/10 blur-xl' />
                <Image
                  src='/avatar.png'
                  alt='Profile'
                  width={300}
                  height={300}
                  className='rounded-full object-cover border-4 border-primary/20 relative z-10'
                />
              </div>
            </div>
            <div className='lg:w-2/3 backdrop-blur-md bg-background/30 p-8 rounded-lg border border-primary/20 shadow-lg'>
              <h2 className='text-3xl md:text-4xl font-bold mb-6 text-primary'>About Me</h2>
              <p className='text-lg mb-4 text-primary/80'>
                {`Hello! I'm Jeramai, a passionate full-stack developer with over ${experienceYears} years of experience building web
                applications. I specialize in React, Node.js, and modern web technologies.`}
              </p>
              <p className='text-lg mb-4 text-primary/80'>
                {`My journey in web development started when I built my first website at the age of 16. Since then, I've worked with
                startups and established companies to create intuitive and performant digital experiences.`}
              </p>
              <p className='text-lg mb-6 text-primary/80'>
                {`When I'm not coding, you can find me around town trying different pizza places, watching a movie, or experimenting
                with new technologies.`}
              </p>
              <div className='flex flex-wrap gap-4'>
                {/* Frontend Frameworks/Libraries */}
                <Skill>React</Skill>
                <Skill>Next.js</Skill>
                <Skill>React Native</Skill>

                {/* Programming Languages */}
                <Skill>TypeScript</Skill>
                <Skill>PHP</Skill>

                {/* Backend Technologies */}
                <Skill>Node.js</Skill>
                <Skill>Laravel</Skill>
                <Skill>MySQL</Skill>

                {/* Styling */}
                <Skill>Tailwind CSS</Skill>
                <Skill>SCSS</Skill>

                {/* Graphics/3D */}
                <Skill>Three.js</Skill>

                {/* Mobile Development */}
                <Skill>Flutter</Skill>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id='contact' className='py-20 relative overflow-hidden'>
        <div className='absolute inset-0 z-0'>
          <Canvas>
            <ambientLight intensity={0.2} />
            <Suspense fallback={null}>
              <Environment preset='night' />
              <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={0.5} />
            </Suspense>
          </Canvas>
        </div>
        <div className='container mx-auto px-4 text-center relative z-10'>
          <div className='backdrop-blur-md bg-background/30 p-8 rounded-lg border border-primary/20 shadow-lg max-w-3xl mx-auto'>
            <h2 className='text-3xl md:text-4xl font-bold mb-6 text-primary'>Get In Touch</h2>
            <p className='text-lg mb-8 max-w-2xl mx-auto text-primary/80'>
              {`I'm currently open to freelance opportunities and interesting projects. If you'd like to work together or just say
              hello, feel free to reach out!`}
            </p>
            <div className='flex justify-center gap-6 mb-12'>
              <SocialLink href='https://github.com/jeramai' icon={<Github size={24} />} label='GitHub' />
              <SocialLink href='https://linkedin.com/in/jeramai' icon={<Linkedin size={24} />} label='LinkedIn' />
              <SocialLink href='mailto:jeramai.work@gmail.com' icon={<Mail size={24} />} label='Email' />
            </div>
            <Button size='lg' asChild className='backdrop-blur-sm bg-primary/80 hover:bg-primary/90'>
              <a href='mailto:jeramai.work@gmail.com'>Send Email</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className='py-8 border-t border-primary/20 backdrop-blur-md bg-background/30'>
        <div className='container mx-auto px-4 text-center'>
          <p className='text-primary/60'>© {new Date().getFullYear()} Jeram.ai. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
