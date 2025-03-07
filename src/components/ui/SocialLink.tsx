export default function SocialLink({ href, icon, label }: Readonly<{ href: string; icon: React.ReactNode; label: string }>) {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className='p-3 rounded-full backdrop-blur-sm bg-background/50 border border-primary/20 hover:bg-primary/20 transition-colors'
      aria-label={label}
    >
      {icon}
    </a>
  );
}
