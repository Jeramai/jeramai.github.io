'use client';

import { useScrollLock } from '@/lib/use-scroll-lock';
import { useEffect, useRef, useState } from 'react';

const IDLE_MS = 60_000;
const DX = 1.7;
const DY = 1.15;
const CORNER_PX = 6;

const COLOURS = ['#ff2d55', '#ff9500', '#ffd400', '#34ff6a', '#00e0ff', '#4d7bff', '#b14dff', '#ff5ce0'];

export default function Screensaver() {
  const [on, setOn] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const tallyRef = useRef<HTMLParagraphElement | null>(null);
  const corners = useRef(0);

  useScrollLock(on);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = window.setTimeout(() => setOn(true), IDLE_MS);
    const wake = () => {
      window.clearTimeout(timer);
      setOn(false);
      timer = window.setTimeout(() => setOn(true), IDLE_MS);
    };

    const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'touchstart'] as const;
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));

    return () => {
      window.clearTimeout(timer);
      events.forEach((e) => window.removeEventListener(e, wake));
    };
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!on || !box) return;

    let colour = Math.floor(Math.random() * COLOURS.length);
    box.style.color = COLOURS[colour];

    let x = Math.random() * (window.innerWidth - box.offsetWidth);
    let y = Math.random() * (window.innerHeight - box.offsetHeight);
    let dx = Math.random() < 0.5 ? -DX : DX;
    let dy = Math.random() < 0.5 ? -DY : DY;
    let raf = 0;

    const recolour = () => {
      colour = (colour + 1 + Math.floor(Math.random() * (COLOURS.length - 1))) % COLOURS.length;
      box.style.color = COLOURS[colour];
    };

    const scoreCorner = () => {
      corners.current += 1;
      box.style.color = '#ffffff';
      const tally = tallyRef.current;
      if (!tally) return;
      tally.hidden = false;
      tally.textContent = corners.current === 1 ? 'It hit the corner.' : `It hit the corner ${corners.current} times.`;
    };

    const tick = () => {
      const maxX = window.innerWidth - box.offsetWidth;
      const maxY = window.innerHeight - box.offsetHeight;
      x += dx;
      y += dy;

      const wallX = x <= 0 || x >= maxX;
      const wallY = y <= 0 || y >= maxY;

      if (wallX) {
        dx = -dx;
        x = Math.max(0, Math.min(x, maxX));
      }
      if (wallY) {
        dy = -dy;
        y = Math.max(0, Math.min(y, maxY));
      }

      if (wallX || wallY) {
        const corner =
          (wallX && (y <= CORNER_PX || y >= maxY - CORNER_PX)) || (wallY && (x <= CORNER_PX || x >= maxX - CORNER_PX));
        if (corner) scoreCorner();
        else recolour();
      }

      box.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  if (!on) return null;

  return (
    <div className='fixed inset-0 z-[80] overflow-hidden bg-black' aria-hidden='true'>
      <div ref={boxRef} className='absolute top-0 left-0 text-[#00e0ff] will-change-transform'>
        <svg viewBox='0 0 320 140' className='block w-[150px] sm:w-[210px]'>
          <ellipse
            cx='160'
            cy='54'
            rx='150'
            ry='40'
            fill='none'
            stroke='currentColor'
            strokeWidth='7'
            transform='translate(160 54) skewX(-10) translate(-160 -54)'
          />
          <text
            x='160'
            y='73'
            textAnchor='middle'
            textLength='244'
            lengthAdjust='spacingAndGlyphs'
            className='font-display'
            fontSize='58'
            fontWeight='900'
            fontStyle='italic'
            fill='currentColor'
            stroke='#000000'
            strokeWidth='13'
            paintOrder='stroke'
          >
            JERAM.AI
          </text>
          <rect x='85' y='102' width='150' height='30' rx='4' fill='currentColor' />
          <text
            x='160'
            y='124'
            textAnchor='middle'
            textLength='126'
            lengthAdjust='spacingAndGlyphs'
            className='font-display'
            fontSize='18'
            fontWeight='700'
            fill='#000000'
          >
            PORTFOLIO
          </text>
        </svg>
      </div>

      <p ref={tallyRef} hidden className='absolute right-3 bottom-3 m-0 font-mono text-[0.7rem] tracking-widest text-[#5a5a5a]' />
    </div>
  );
}
