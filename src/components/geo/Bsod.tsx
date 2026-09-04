'use client';

import { useScrollLock } from '@/lib/use-scroll-lock';
import { useEffect, useState } from 'react';

export const BSOD_EVENT = 'jf:bsod';

const KEY_GRACE_MS = 2000;
const TAP_GRACE_MS = 4000;

export default function Bsod() {
  const [crashed, setCrashed] = useState(false);

  useScrollLock(crashed);

  useEffect(() => {
    const onCrash = () => setCrashed(true);
    window.addEventListener(BSOD_EVENT, onCrash);
    return () => window.removeEventListener(BSOD_EVENT, onCrash);
  }, []);

  // Keys recover after a beat, so the click burst that caused the crash cannot also skip it.
  // A pointer works too, but later, for anyone without a keyboard.
  useEffect(() => {
    if (!crashed) return;
    const recover = () => setCrashed(false);

    const keyTimer = window.setTimeout(() => window.addEventListener('keydown', recover), KEY_GRACE_MS);
    const tapTimer = window.setTimeout(() => window.addEventListener('pointerdown', recover), TAP_GRACE_MS);

    return () => {
      window.clearTimeout(keyTimer);
      window.clearTimeout(tapTimer);
      window.removeEventListener('keydown', recover);
      window.removeEventListener('pointerdown', recover);
    };
  }, [crashed]);

  if (!crashed) return null;

  return (
    <div
      className='fixed inset-0 z-[90] flex flex-col overflow-auto bg-[#0000aa] p-6 font-mono text-[#e0e0e0] sm:p-12'
      role='alertdialog'
      aria-label='Simulated system error'
    >
      <div className='mx-auto my-auto w-full max-w-[640px] leading-relaxed'>
        <p className='mb-6 text-center'>
          <span className='bg-[#e0e0e0] px-3 py-0.5 font-bold text-[#0000aa]'>JERAM.AI</span>
        </p>

        <p className='mb-4'>
          A fatal exception 0E has occurred at 0028:C0011997 in VXD VMM(01) + 00010997. The current application will be
          terminated.
        </p>

        <ul className='mb-6 list-none space-y-1 pl-4'>
          <li>* Press any key to terminate the current application.</li>
          <li>* Press CTRL+ALT+DEL again to restart your computer.</li>
          <li>&nbsp;&nbsp;You will lose any unsaved information in all applications.</li>
        </ul>

        <p className='mb-4'>
          Cause: the UNDER CONSTRUCTION sign was hit three times and fell off the page. It was a sign, not a button. It had been
          up since 1997.
        </p>

        <p className='mb-6'>A theme from that year was behind it. It is on the page now.</p>

        <p className='text-center'>
          Press any key to continue <span className='animate-blink'>_</span>
        </p>
      </div>
    </div>
  );
}
