'use client';

import { Button } from '@/components/ui/button';
import WaterSurface from '@/components/WaterSurface';
import { Environment, Preload } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';

export default function Hero() {
  return (
    <section id='hero' className='w-full h-screen pt-16 relative overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <Canvas camera={{ position: [0, 0.35, 5], fov: 75 }}>
          <HeroCanvas />
        </Canvas>
      </div>
      <div className='absolute inset-0 flex items-center justify-center flex-col text-center z-10 pointer-events-none'>
        <div className='m-3 backdrop-blur-md bg-background/30 p-8 rounded-lg max-w-2xl pointer-events-auto border border-primary/20 shadow-lg'>
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
      <div className='absolute inset-x-0 bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20 h-[100px]'></div>
    </section>
  );
}
function HeroCanvas() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== 'undefined') {
      // Initial check
      setIsMobile(window.innerWidth < 768);

      // Add resize listener
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };

      window.addEventListener('resize', handleResize);

      // Cleanup
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useFrame(({ camera, clock }) => {
    camera.position.x = Math.sin(clock.elapsedTime * 0.025) * 5;
    camera.position.z = Math.cos(clock.elapsedTime * 0.025) * 5;
    camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Preload all />

      <Suspense fallback={null}>{isMobile ? null : <WaterSurface />}</Suspense>

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
    </>
  );
}
