import Panel from '@/components/geo/Panel';

const LINKS = [
  { href: '#welcome', label: 'Home', dot: '#ff2020' },
  { href: '#about', label: 'About Me', dot: '#2080ff' },
  { href: '#skills', label: 'What I Am Good At', dot: '#ffd020' },
  { href: '#projects', label: 'My Projects', dot: '#20c040' },
  { href: '#work', label: 'Where I Work', dot: '#40e0d0' },
  { href: '#links', label: 'Cool Links', dot: '#c060ff' },
  { href: 'mailto:jeramai.work@gmail.com', label: 'E-Mail Me', dot: '#ff8020' }
];

export default function Rail() {
  return (
    <div className='grid gap-4 md:sticky md:top-12'>
      <Panel title='Your Choices'>
        <nav>
          <ul className='m-0 list-none p-0'>
            {LINKS.map((l) => (
              <li key={l.href} className='mt-2 first:mt-0'>
                <a href={l.href} className='flex items-center gap-2 font-bold underline'>
                  <span
                    className='size-2.5 flex-none rounded-full [box-shadow:inset_-2px_-2px_0_#0006]'
                    style={{ background: l.dot }}
                  />
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Panel>
    </div>
  );
}
