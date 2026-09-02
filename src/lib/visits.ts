'use client';

const KEY = 'jf_hits';

let cached: number | null = null;

/* Memoised so useSyncExternalStore gets a stable snapshot and the count bumps once per load. */
function read() {
  if (cached === null) {
    try {
      cached = Number(localStorage.getItem(KEY) ?? 0) + 1;
      localStorage.setItem(KEY, String(cached));
    } catch {
      cached = 1;
    }
  }
  return cached;
}

export function subscribeToVisits() {
  return () => {};
}

export function getVisits() {
  return read();
}

export function getServerVisits(): number | null {
  return null;
}
