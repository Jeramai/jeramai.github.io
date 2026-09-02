'use client';

import Panel from '@/components/geo/Panel';
import { getServerVisits, getVisits, subscribeToVisits } from '@/lib/visits';
import { useSyncExternalStore } from 'react';

const LINKS = [
  { href: '#welcome', label: 'Home', dot: '#ff2020' },
  { href: '#about', label: 'About Me', dot: '#2080ff' },
  { href: '#projects', label: 'My Projects', dot: '#20c040' },
  { href: '#work', label: 'Where I Work', dot: '#ffd020' },
  { href: '#links', label: 'Cool Links', dot: '#c060ff' },
  { href: 'mailto:jeramai.work@gmail.com', label: 'E-Mail Me', dot: '#ff8020' }
];

const PLACES = [100000, 10000, 1000, 100, 10, 1];

function Counter() {
  const hits = useSyncExternalStore(subscribeToVisits, getVisits, getServerVisits);

  return (
    <>
      <div className='inline-flex gap-0.5 border-2 border-[#888] bg-black p-1' aria-hidden='true'>
        {PLACES.map((place) => (
          <span key={place} className='min-w-[18px] bg-[#111] py-0.5 text-center font-mono text-lg font-bold text-[#22ff66]'>
            {hits === null ? '0' : Math.floor(hits / place) % 10}
          </span>
        ))}
      </div>
      <p className='mt-2 mb-0 text-xs text-ink-dim'>You are visitor number {hits ?? '…'} (counted in this browser only).</p>
    </>
  );
}

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

      <Panel title='This Site Is'>
        <Counter />
      </Panel>
    </div>
  );
}
