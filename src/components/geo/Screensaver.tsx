'use client';

import { useEffect, useRef, useState } from 'react';

const IDLE_MS = 60_000;
const SPEED = 1.6;

export default function Screensaver() {
  const [on, setOn] = useState(false);
  const [hits, setHits] = useState(0);
  const boxRef = useRef<HTMLDivElement | null>(null);

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

    let x = Math.random() * (window.innerWidth - box.offsetWidth);
    let y = Math.random() * (window.innerHeight - box.offsetHeight);
    let dx = SPEED;
    let dy = SPEED;
    let raf = 0;

    const tick = () => {
      const maxX = window.innerWidth - box.offsetWidth;
      const maxY = window.innerHeight - box.offsetHeight;
      x += dx;
      y += dy;

      let bounced = false;
      if (x <= 0 || x >= maxX) {
        dx = -dx;
        x = Math.max(0, Math.min(x, maxX));
        bounced = true;
      }
      if (y <= 0 || y >= maxY) {
        dy = -dy;
        y = Math.max(0, Math.min(y, maxY));
        bounced = true;
      }
      // The corner is the whole reason anyone watches one of these.
      if (bounced && (x <= 1 || x >= maxX - 1) && (y <= 1 || y >= maxY - 1)) setHits((n) => n + 1);

      box.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on]);

  if (!on) return null;

  return (
    <div className='fixed inset-0 z-[80] overflow-hidden bg-black' aria-hidden='true'>
      <div ref={boxRef} className='absolute top-0 left-0 will-change-transform'>
        <span className='block font-display text-4xl font-black tracking-widest text-accent [text-shadow:3px_3px_0_var(--head-b)]'>
          JERAM.AI
        </span>
        <span className='mt-1 block text-center font-display text-[0.7rem] tracking-widest text-ink-dim'>
          {hits > 0 ? `CORNER HITS: ${hits}` : 'MOVE THE MOUSE'}
        </span>
      </div>
    </div>
  );
}
