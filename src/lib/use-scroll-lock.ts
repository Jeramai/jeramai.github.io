'use client';

import { useEffect } from 'react';

/* Hides the scrollbar behind a fullscreen overlay, padding the gap so nothing jumps. */
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;
    const gap = window.innerWidth - root.clientWidth;
    const overflow = root.style.overflow;
    const padding = root.style.paddingRight;

    root.style.overflow = 'hidden';
    if (gap > 0) root.style.paddingRight = `${gap}px`;

    return () => {
      root.style.overflow = overflow;
      root.style.paddingRight = padding;
    };
  }, [active]);
}
