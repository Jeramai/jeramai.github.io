'use client';

import { useEffect } from 'react';

const COUNT = 14;
const COLORS = ['var(--accent)', 'var(--hot)', 'var(--accent-2)', 'var(--link)'];

export default function CursorTrail() {
  useEffect(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (coarse || still) return;

    const host = document.createElement('div');
    host.setAttribute('aria-hidden', 'true');
    host.className = 'pointer-events-none fixed inset-0 z-[60] overflow-hidden';
    document.body.appendChild(host);

    const dots = Array.from({ length: COUNT }, (_, i) => {
      const el = document.createElement('span');
      const size = 10 - Math.floor((i / COUNT) * 7);
      el.style.cssText = `position:absolute;top:0;left:0;width:${size}px;height:${size}px;background:${COLORS[i % COLORS.length]};opacity:${(1 - i / COUNT) * 0.85};will-change:transform;`;
      host.appendChild(el);
      return el;
    });

    const xs = Array.from({ length: COUNT }, () => -50);
    const ys = Array.from({ length: COUNT }, () => -50);
    let mx = -50;
    let my = -50;
    let raf = 0;

    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Each dot chases the one ahead of it, which is what gives the tail its lag.
    // The loop parks itself once everything has caught up, so a still pointer costs nothing.
    const tick = () => {
      let px = mx;
      let py = my;
      let moving = false;
      for (let i = 0; i < COUNT; i++) {
        const dx = px - xs[i];
        const dy = py - ys[i];
        if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) moving = true;
        xs[i] += dx * 0.34;
        ys[i] += dy * 0.34;
        dots[i].style.transform = `translate3d(${xs[i]}px, ${ys[i]}px, 0)`;
        px = xs[i];
        py = ys[i];
      }
      raf = moving ? requestAnimationFrame(tick) : 0;
    };

    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onMove);
      cancelAnimationFrame(raf);
      host.remove();
    };
  }, []);

  return null;
}
