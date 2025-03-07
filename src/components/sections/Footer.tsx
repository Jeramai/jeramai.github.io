export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='py-8 border-t border-primary/20 backdrop-blur-md bg-background/30'>
      <div className='container mx-auto px-4 text-center'>
        <p className='text-primary/60'>© {currentYear} Jeram.ai. All rights reserved.</p>
      </div>
    </footer>
  );
}
