'use client';

import { markCurrentSeen, useTheme } from '@/lib/theme-store';
import { useEffect, useState } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const TURBO_MS = 1500;

export default function SecretCodes() {
  const { shuffle } = useTheme();
  const [turbo, setTurbo] = useState(false);

  useEffect(() => {
    let keys: string[] = [];

    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (el as HTMLElement | null)?.isContentEditable) return;

      keys = [...keys, e.key].slice(-KONAMI.length);
      if (keys.length === KONAMI.length && keys.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        keys = [];
        setTurbo((t) => !t);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    markCurrentSeen();
  }, []);

  useEffect(() => {
    if (!turbo) return;
    const id = window.setInterval(shuffle, TURBO_MS);
    return () => window.clearInterval(id);
  }, [turbo, shuffle]);

  if (!turbo) return null;

  return (
    <output className='pointer-events-none fixed bottom-3 left-1/2 z-[70] -translate-x-1/2'>
      <p className='edge theme-shadow m-0 head-gradient px-4 py-2 font-display text-sm font-bold tracking-widest uppercase'>
        ▶▶ Turbo mode ◀◀
      </p>
    </output>
  );
}
