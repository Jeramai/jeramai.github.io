'use client';

import ConstructionSign from '@/components/geo/ConstructionSign';
import { useTheme, useThemeKeys } from '@/lib/theme-store';

export default function Masthead() {
  const { theme, index, total, shuffle } = useTheme();
  useThemeKeys();

  return (
    <header className='px-0 pt-5 pb-2 text-center'>
      <ConstructionSign />

      <h1 className='my-1.5 font-display text-[clamp(2.2rem,7vw,4.6rem)] leading-none font-black text-accent [text-shadow:2px_2px_0_var(--head-b),4px_4px_0_#0009]'>
        JERAMAI FABER
      </h1>

      <p className='track-wide m-0 mb-2.5 font-display text-[clamp(0.8rem,2vw,1.15rem)] uppercase text-ink-dim'>
        ~ My home page on the World Wide Web ~
      </p>

      <p className='m-0 mb-3.5 text-[0.85rem] font-bold tracking-widest uppercase text-hot'>
        <span className='animate-blink'>+++</span> Welcome to my corner of cyberspace <span className='animate-blink'>+++</span>
      </p>

      <button type='button' onClick={shuffle} className='shuffle-btn'>
        Shuffle my theme!!!
      </button>

      <p className='mt-2.5 mb-0 text-[0.85rem] font-bold tracking-wider uppercase'>
        {theme.id === 't1997' ? (
          <>
            Secret theme: <b className='text-hot'>{theme.name}</b>
          </>
        ) : (
          <>
            Now viewing theme {index + 1} of {total}: <b className='text-hot'>{theme.name}</b>
          </>
        )}
      </p>

      <p className='edge-thin my-3.5 inline-block px-4 py-2 text-[0.85rem] text-ink-dim'>
        Best viewed in Netscape Navigator 4.0 at 800&times;600
      </p>

      <hr className='rainbow mx-auto my-2.5 mb-5 h-2 max-w-3xl border-0' />
    </header>
  );
}
