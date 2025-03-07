import About from '@/components/sections/About';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';
import Header from '@/components/sections/Header';
import Hero from '@/components/sections/Hero';
import Projects from '@/components/sections/Projects';

export default function Home() {
  return (
    <div className='min-h-screen bg-background text-foreground flex flex-col'>
      {/* Navigation */}
      <Header />

      {/* Hero Section with 3D */}
      <Hero />

      {/* Projects Section */}
      <Projects />

      {/* About Section */}
      <About />

      {/* Contact Section */}
      <Contact />

      {/* Footer */}
      <Footer />
    </div>
  );
}
