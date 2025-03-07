export default function Skill({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <span className='px-4 py-2 backdrop-blur-sm bg-primary/10 text-primary rounded-full text-sm font-medium border border-primary/20'>
      {children}
    </span>
  );
}
