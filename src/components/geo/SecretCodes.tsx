'use client';

import { markCurrentSeen, setTheme, useTheme } from '@/lib/theme-store';
import { secretTheme } from '@/lib/themes.generated';
import { useEffect, useState } from 'react';

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

const TURBO_MS = 1500;

export default function SecretCodes() {
  const { shuffle } = useTheme();
  const [turbo, setTurbo] = useState(false);
  const [found, setFound] = useState(false);

  useEffect(() => {
    let keys: string[] = [];
    let digits = '';

    const onKey = (e: KeyboardEvent) => {
      const el = document.activeElement;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || (el as HTMLElement | null)?.isContentEditable) return;

      keys = [...keys, e.key].slice(-KONAMI.length);
      if (keys.length === KONAMI.length && keys.every((k, i) => k.toLowerCase() === KONAMI[i].toLowerCase())) {
        keys = [];
        setTurbo((t) => !t);
      }

      if (/^[0-9]$/.test(e.key)) {
        digits = (digits + e.key).slice(-4);
        if (digits === '1997') {
          digits = '';
          setTheme(secretTheme.id);
          setFound(true);
          window.setTimeout(() => setFound(false), 6000);
        }
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

  if (!turbo && !found) return null;

  return (
    <output className='pointer-events-none fixed bottom-3 left-1/2 z-[70] -translate-x-1/2'>
      <p className='edge theme-shadow m-0 head-gradient px-4 py-2 font-display text-sm font-bold tracking-widest uppercase'>
        {found ? '★ 1997 unlocked — secret theme ★' : '▶▶ Turbo mode ◀◀'}
      </p>
    </output>
  );
}
