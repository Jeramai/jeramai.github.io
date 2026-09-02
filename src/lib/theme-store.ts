'use client';

import themes, { type Theme } from '@/lib/themes.generated';
import { useSyncExternalStore } from 'react';

export const STORAGE_KEY = 'jf_theme';

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
  listeners.forEach((l) => l());
}

export function useTheme(): { theme: Theme; index: number; total: number; shuffle: () => void } {
  const id = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const found = themes.findIndex((t) => t.id === id);
  const index = found < 0 ? 0 : found;

  const shuffle = () => {
    let next = index;
    while (next === index) next = Math.floor(Math.random() * themes.length);
    setTheme(themes[next].id);
  };

  return { theme: themes[index], index, total: themes.length, shuffle };
}
