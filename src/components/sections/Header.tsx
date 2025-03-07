'use client';

import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((o) => !o);

  return (
    <header className='fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/30 border-b border-primary/20'>
      <div className={`container mx-auto px-4 py-4 flex justify-between items-center ${isMenuOpen ? '!bg-background/80' : ''}`}>
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
  );
}
