'use client';

import Panel from '@/components/geo/Panel';
import { seenCount, setTheme, subscribeThemes, useTheme } from '@/lib/theme-store';
import themes, { secretTheme } from '@/lib/themes.generated';
import { useSyncExternalStore } from 'react';

export default function ThemesSeen() {
  const { theme } = useTheme();
  const seen = useSyncExternalStore(subscribeThemes, seenCount, () => 0);

  const total = themes.length;
  const pct = Math.round((seen / total) * 100);
  const complete = seen >= total;

  return (
    <Panel title='Themes Discovered'>
      <p className='m-0 font-display text-lg tracking-wider text-accent'>
        {String(seen).padStart(2, '0')} / {total}
      </p>

      <div className='edge-thin h-4 w-full bg-panel-2' aria-hidden='true'>
        <div className='head-gradient h-full transition-[width] duration-300' style={{ width: `${pct}%` }} />
      </div>

      <p className='m-0 text-[0.75rem] text-ink-dim'>{theme.name}</p>

      {complete ? (
        <button
          type='button'
          onClick={() => setTheme(secretTheme.id)}
          className='geo-btn w-full'
          aria-pressed={theme.id === secretTheme.id}
        >
          + 1 secret theme
        </button>
      ) : null}
    </Panel>
  );
}
