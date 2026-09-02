'use client';

import Panel from '@/components/geo/Panel';
import { hasFoundSecret, seenCount, subscribeThemes, useTheme } from '@/lib/theme-store';
import themes from '@/lib/themes.generated';
import { useSyncExternalStore } from 'react';

export default function ThemesSeen() {
  const { theme } = useTheme();
  const seen = useSyncExternalStore(subscribeThemes, seenCount, () => 0);
  const secret = useSyncExternalStore(subscribeThemes, hasFoundSecret, () => false);

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

      <p className='m-0 text-[0.75rem] text-ink-dim'>
        {complete
          ? 'All 99. You pressed that button a lot.'
          : `Keep shuffling. ${total - seen} to go. Currently on ${theme.name}.`}
      </p>

      {secret ? <p className='m-0 text-[0.75rem] font-bold text-hot'>+ 1 secret theme found</p> : null}
    </Panel>
  );
}
