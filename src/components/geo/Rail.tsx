import MidiJukebox from '@/components/geo/MidiJukebox';
import Panel from '@/components/geo/Panel';
import ThemesSeen from '@/components/geo/ThemesSeen';

const LINKS = [
  { href: '#welcome', label: 'Home', dot: '#ff2020' },
  { href: '#about', label: 'About Me', dot: '#2080ff' },
  { href: '#skills', label: 'What I Am Good At', dot: '#ffd020' },
  { href: '#projects', label: 'My Projects', dot: '#20c040' },
  { href: 'mailto:jeramai.work@gmail.com', label: 'E-Mail Me', dot: '#ff8020' }
];

const COOL_LINKS = [
  { href: 'https://github.com/jeramai', label: 'My GitHub' },
  { href: 'https://linkedin.com/in/jeramai', label: 'My LinkedIn' },
  { href: 'https://nestjs.doctor', label: 'nestjs-doctor' },
  { href: 'https://jeramai.github.io/Planet-Crashers/', label: 'Planet Crashers' },
  { href: 'https://jeramai.github.io/svg-to-3d/', label: 'SVG to 3D' }
];

export default function Rail() {
  return (
    <div className='grid gap-4 md:sticky md:top-12'>
      <Panel title='Your Choices'>
        <nav>
          <ul className='m-0 list-none p-0'>
            {LINKS.map((l) => (
              <li key={l.href} className='mt-2 first:mt-0'>
                <a href={l.href} className='flex min-h-6 items-center gap-2 py-1 font-bold underline'>
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

      <Panel title='Cool Links'>
        <ul className='m-0 list-none p-0'>
          {COOL_LINKS.map((l) => (
            <li key={l.href} className='mt-2 first:mt-0'>
              <a
                href={l.href}
                target='_blank'
                rel='noopener noreferrer'
                className='flex min-h-6 items-center gap-2 py-1 underline'
              >
                <span aria-hidden='true'>&rarr;</span>
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </Panel>

      <ThemesSeen />

      <MidiJukebox />
    </div>
  );
}
