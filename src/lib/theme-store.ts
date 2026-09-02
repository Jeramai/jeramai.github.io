'use client';

import { STORAGE_KEY, THEME_PARAM } from '@/lib/theme-keys';
import themes, { type Theme } from '@/lib/themes.generated';
import { useEffect, useSyncExternalStore } from 'react';

export { STORAGE_KEY, THEME_PARAM } from '@/lib/theme-keys';

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

/* The inline bootstrap script paints <html data-theme> before hydration, so the DOM is the source of truth. */
function getSnapshot() {
  return document.documentElement.dataset.theme ?? themes[0].id;
}

function getServerSnapshot() {
  return themes[0].id;
}

export function setTheme(id: string) {
  document.documentElement.dataset.theme = id;
  try {
    localStorage.setItem(STORAGE_KEY, id);
  } catch {
    /* private mode, the theme just does not persist */
  }
  // Keep the address bar in step, so whatever you are looking at is what you share.
  try {
    const url = new URL(window.location.href);
    url.searchParams.set(THEME_PARAM, id);
    window.history.replaceState(null, '', url);
  } catch {
    /* history is unavailable, sharing just falls back to a random theme */
  }
  listeners.forEach((l) => l());
}

type ThemeControls = {
  theme: Theme;
  index: number;
  total: number;
  shuffle: () => void;
  prev: () => void;
  next: () => void;
};

export function useTheme(): ThemeControls {
  const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const found = themes.findIndex((t) => t.id === id);
  const index = found < 0 ? 0 : found;

  const step = (by: number) => setTheme(themes[(index + by + themes.length) % themes.length].id);

  const shuffle = () => {
    let pick = index;
    while (pick === index) pick = Math.floor(Math.random() * themes.length);
    setTheme(themes[pick].id);
  };

  return {
    theme: themes[index],
    index,
    total: themes.length,
    shuffle,
    prev: () => step(-1),
    next: () => step(1)
  };
}

/* Arrow keys step themes, S shuffles. Ignored while a control or a text field has focus. */
export function useThemeKeys() {
  const { prev, next, shuffle } = useTheme();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = document.activeElement;
      const tag = el?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (el as HTMLElement | null)?.isContentEditable) return;

      if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
      else if (e.key === 's' || e.key === 'S') shuffle();
      else return;
      e.preventDefault();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [prev, next, shuffle]);
}
