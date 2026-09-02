'use client';

import { useTheme } from '@/lib/theme-store';
import { Fragment } from 'react';

const SHOUTS = ['THIS PAGE IS UNDER CONSTRUCTION FOREVER', 'BEST VIEWED AT 800x600', 'NO REFUNDS', 'TELL A FRIEND'];

export default function Marquee() {
  const { theme } = useTheme();
  const items = [`NOW ENTERING: ${theme.name}`, ...SHOUTS];

  // The theme slot is width-reserved: hydration swaps a longer name in and would otherwise shift the track.
  const run = (copy: string) =>
    items.map((item, i) => (
      <Fragment key={`${copy}-${item}`}>
        <span className={i === 0 ? 'inline-block min-w-[31ch] px-7' : 'px-7'}>{item}</span>
        {i < items.length - 1 ? <span className='text-marquee-sep'>◆◆◆</span> : null}
      </Fragment>
    ));

  return (
    <div className='sticky top-0 z-50 overflow-hidden border-b-2 border-edge bg-marquee-bg font-display text-sm tracking-wider whitespace-nowrap text-marquee-ink'>
      <div className='inline-block animate-marquee py-1.5'>
        <span className='inline-block'>{run('a')}</span>
        <span className='inline-block px-7 text-marquee-sep'>◆◆◆</span>
        <span className='inline-block' aria-hidden='true'>
          {run('b')}
        </span>
        <span className='inline-block px-7 text-marquee-sep' aria-hidden='true'>
          ◆◆◆
        </span>
      </div>
    </div>
  );
}
