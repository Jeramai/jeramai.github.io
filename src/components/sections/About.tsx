import Skill from '@/components/ui/Skill';
import Image from 'next/image';

export default function About() {
  const experienceYears = new Date().getFullYear() - 2018;

  return (
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
  );
}
