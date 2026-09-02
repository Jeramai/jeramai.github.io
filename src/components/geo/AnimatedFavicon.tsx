'use client';

import { useEffect } from 'react';

const SIZE = 32;
const FRAMES = 8;
const STEP_MS = 120;

export default function AnimatedFavicon() {
  useEffect(() => {
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = document.createElement('canvas');
    canvas.width = SIZE;
    canvas.height = SIZE;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    const original = link?.getAttribute('href') ?? null;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }

    // Hazard stripes scrolling behind a J, which is the masthead badge at 32px.
    const draw = (frame: number) => {
      const offset = (frame / FRAMES) * 16;
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.fillStyle = '#141414';
      ctx.fillRect(0, 0, SIZE, SIZE);

      ctx.save();
      ctx.beginPath();
      ctx.rect(0, 0, SIZE, SIZE);
      ctx.clip();
      ctx.fillStyle = '#ffd400';
      for (let x = -48; x < SIZE + 48; x += 16) {
        ctx.beginPath();
        ctx.moveTo(x + offset, SIZE);
        ctx.lineTo(x + offset + 8, SIZE);
        ctx.lineTo(x + offset + 8 + SIZE, 0);
        ctx.lineTo(x + offset + SIZE, 0);
        ctx.closePath();
        ctx.fill();
      }
      ctx.restore();

      ctx.fillStyle = '#0d0d0d';
      ctx.fillRect(4, 4, SIZE - 8, SIZE - 8);
      ctx.fillStyle = '#ffd400';
      ctx.font = 'bold 22px Impact, "Arial Black", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('J', SIZE / 2, SIZE / 2 + 1);

      link.href = canvas.toDataURL('image/png');
    };

    if (still) {
      draw(0);
      return;
    }

    let frame = 0;
    let timer = 0;

    const run = () => {
      draw(frame);
      frame = (frame + 1) % FRAMES;
      timer = window.setTimeout(run, STEP_MS);
    };

    // A background tab has no reason to keep repainting an icon.
    const onVisibility = () => {
      window.clearTimeout(timer);
      if (!document.hidden) run();
    };

    run();
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.clearTimeout(timer);
      document.removeEventListener('visibilitychange', onVisibility);
      if (original) link.href = original;
    };
  }, []);

  return null;
}
