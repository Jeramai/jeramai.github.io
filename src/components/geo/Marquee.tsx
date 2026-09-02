'use client';

import { useTheme } from '@/lib/theme-store';

const SHOUTS = [
  'THIS PAGE IS UNDER CONSTRUCTION FOREVER',
  'BEST VIEWED AT 800x600',
  'SIGN MY GUESTBOOK',
  'NO REFUNDS',
  'TELL A FRIEND'
];

export default function Marquee() {
  const { theme } = useTheme();
  const text = [`NOW ENTERING: ${theme.name}`, ...SHOUTS].join(' !!! ');

  return (
    <div className='sticky top-0 z-50 overflow-hidden border-b-2 border-edge bg-marquee-bg font-display text-sm tracking-wider whitespace-nowrap text-marquee-ink'>
      <div className='inline-block animate-marquee py-1.5'>
        <span className='pr-12'>{text}</span>
        <span className='pr-12' aria-hidden='true'>
          {text}
        </span>
      </div>
    </div>
  );
}
