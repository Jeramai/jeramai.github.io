'use client';

import { useEffect, useState } from 'react';

export const BSOD_EVENT = 'jf:bsod';

export default function Bsod() {
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    const onCrash = () => setCrashed(true);
    window.addEventListener(BSOD_EVENT, onCrash);
    return () => window.removeEventListener(BSOD_EVENT, onCrash);
  }, []);

  // "Press any key to continue" should mean it, so the joke does not become a trap.
  useEffect(() => {
    if (!crashed) return;
    const recover = () => setCrashed(false);
    window.addEventListener('keydown', recover);
    window.addEventListener('pointerdown', recover);
    return () => {
      window.removeEventListener('keydown', recover);
      window.removeEventListener('pointerdown', recover);
    };
  }, [crashed]);

  if (!crashed) return null;

  return (
    <div
      className='fixed inset-0 z-[90] overflow-auto bg-[#0000aa] p-6 font-mono text-[#e0e0e0] sm:p-12'
      role='alertdialog'
      aria-label='Simulated system error'
    >
      <div className='mx-auto max-w-[640px] leading-relaxed'>
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

        <p className='mb-6'>
          Cause: the UNDER CONSTRUCTION sign was clicked seven times. It is a sign, not a button. It has been under construction
          since 1997 and it will not be hurried.
        </p>

        <p className='text-center'>
          Press any key to continue <span className='animate-blink'>_</span>
        </p>
      </div>
    </div>
  );
}
