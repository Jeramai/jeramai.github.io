'use client';

import { Button } from '@/components/ui/button';
import SocialLink from '@/components/ui/SocialLink';
import { Environment, Stars } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Github, Linkedin, Mail } from 'lucide-react';
import { Suspense } from 'react';

export default function Contact() {
  return (
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
  );
}
