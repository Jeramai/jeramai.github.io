'use client';

import Panel from '@/components/geo/Panel';
import { compose } from '@/lib/music/compose';
import { Jukebox } from '@/lib/music/player';
import { useTheme } from '@/lib/theme-store';
import { useEffect, useMemo, useState } from 'react';

const BARS = 14;

export default function MidiJukebox() {
  const { theme } = useTheme();
  const [box] = useState<Jukebox | null>(() => (typeof window === 'undefined' ? null : new Jukebox()));
  const [playing, setPlaying] = useState(false);
  const [levels, setLevels] = useState<number[]>(() => Array<number>(BARS).fill(0));

  const track = useMemo(() => compose(theme.seed, theme.mood, theme.name), [theme.seed, theme.mood, theme.name]);

  // The track follows the theme, so shuffling mid-song swaps the music without a gap.
  useEffect(() => {
    box?.setTrack(track);
  }, [box, track]);

  useEffect(() => {
    if (!box) return;
    const off = box.onStep((step, power) => {
      setLevels((prev) => {
        if (step < 0) return Array<number>(BARS).fill(0);
        const next = prev.map((v) => v * 0.72);
        next[step % BARS] = Math.max(next[step % BARS], power);
        return next;
      });
    });
    return () => {
      off();
      box.stop();
    };
  }, [box]);

  const toggle = async () => {
    if (!box) return;
    if (box.playing) {
      box.stop();
      setPlaying(false);
    } else {
      await box.start();
      setPlaying(true);
    }
  };

  return (
    <Panel title='MIDI Jukebox'>
      <p className='m-0 text-[0.8rem] text-ink-dim'>Now playing</p>
      <p className='m-0 font-display text-[0.9rem] tracking-wide text-accent'>{track.name}.mid</p>
      <p className='m-0 text-[0.75rem] text-ink-dim'>
        {track.bpm} BPM &middot; {theme.mood}
      </p>

      <div className='flex h-12 items-end gap-1 border-2 border-edge bg-black p-1' aria-hidden='true'>
        {levels.map((v, i) => (
          <span
            key={`bar-${BARS - i}`}
            className='flex-1 bg-[#22ff66] transition-[height] duration-75'
            style={{ height: `${Math.max(4, v * 100)}%` }}
          />
        ))}
      </div>

      <div className='flex items-center gap-2'>
        <button type='button' onClick={toggle} className='geo-btn' aria-pressed={playing}>
          {playing ? '■ Stop' : '▶ Play'}
        </button>
        <label className='flex flex-1 items-center gap-1.5 text-[0.75rem] text-ink-dim'>
          Vol
          <input
            type='range'
            min={0}
            max={100}
            defaultValue={35}
            className='w-full accent-[var(--accent)]'
            onChange={(e) => box?.setVolume(Number(e.target.value) / 100)}
          />
        </label>
      </div>

      <p className='m-0 text-[0.72rem] text-ink-dim'>Not a real .mid file. Every theme composes its own tune from its seed.</p>
    </Panel>
  );
}
