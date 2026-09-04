'use client';

import { BSOD_EVENT } from '@/components/geo/Bsod';
import { setTheme } from '@/lib/theme-store';
import { secretTheme } from '@/lib/themes.generated';
import { useState } from 'react';

const BREAKS_AT = 3;
const FALL_MS = 900;
const TILT = ['0deg', '12deg', '24deg'];

/* The sign hangs from the top-left screw, so that corner is the pivot and the last screw to go. */
const SCREWS = [
  { key: 'tr', at: 'top-[3px] right-[3px]', turn: 14, out: 1 },
  { key: 'bl', at: 'bottom-[3px] left-[3px]', turn: 41, out: 2 },
  { key: 'tl', at: 'top-[3px] left-[3px]', turn: 0, out: 3 }
];

const HEAD = '4,0.4 0.88,2.2 0.88,5.8 4,7.6 7.12,5.8 7.12,2.2';
const SOCKET = '4,2 2.27,3 2.27,5 4,6 5.73,5 5.73,3';

function fallDelay() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : FALL_MS;
}

function Screw({ at, turn, dropped }: Readonly<{ at: string; turn: number; dropped: boolean }>) {
  return (
    <svg viewBox='0 0 8 8' aria-hidden='true' className={`absolute z-10 size-2.5 ${at} ${dropped ? 'animate-screw-drop' : ''}`}>
      <g transform={`rotate(${turn} 4 4)`}>
        <polygon points={HEAD} fill='#d2d2d2' stroke='#3c3c3c' strokeWidth='0.7' strokeLinejoin='round' />
        <polygon points={SOCKET} fill='#9a9a9a' stroke='#3c3c3c' strokeWidth='0.5' strokeLinejoin='round' />
      </g>
    </svg>
  );
}

export default function ConstructionSign() {
  const [hits, setHits] = useState(0);
  const [fallen, setFallen] = useState(false);

  const hit = () => {
    if (hits >= BREAKS_AT) return;
    const next = hits + 1;
    setHits(next);
    if (next < BREAKS_AT) return;

    window.setTimeout(() => {
      setFallen(true);
      setTheme(secretTheme.id);
      window.dispatchEvent(new Event(BSOD_EVENT));
    }, fallDelay());
  };

  if (fallen) {
    return (
      <p className='m-0 inline-block border-[3px] border-dashed border-edge p-1'>
        <span className='block bg-black px-4 py-1 font-display text-[0.95rem] tracking-[0.16em] text-[#ffd400]'>
          &#9733; 1997 UNLOCKED &#9733;
        </span>
      </p>
    );
  }

  const falling = hits >= BREAKS_AT;

  return (
    <p
      className={`hazard relative m-0 inline-block origin-[11px_11px] border-[3px] border-black p-1 ${
        falling ? 'animate-sign-fall' : 'transition-transform duration-300 ease-out'
      }`}
      style={falling ? undefined : { transform: `rotate(${TILT[hits]})` }}
    >
      {SCREWS.map((s) => (
        <Screw key={s.key} at={s.at} turn={s.turn} dropped={hits >= s.out} />
      ))}

      <button
        type='button'
        onClick={hit}
        className='relative block bg-black px-4 py-1 font-display text-[0.95rem] tracking-[0.16em] text-[#ffd400] select-none'
      >
        UNDER CONSTRUCTION
        {hits > 0 ? (
          <svg
            aria-hidden='true'
            viewBox='0 0 100 24'
            preserveAspectRatio='none'
            className='pointer-events-none absolute inset-0 size-full'
          >
            <path d='M30 0 L34 7 L27 13 L33 20' fill='none' stroke='#ffd400' strokeWidth='1.2' />
            {hits >= 2 ? <path d='M71 24 L66 16 L73 9 L68 2' fill='none' stroke='#ffd400' strokeWidth='1.2' /> : null}
          </svg>
        ) : null}
      </button>
    </p>
  );
}
