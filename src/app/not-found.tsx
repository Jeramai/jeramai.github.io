import Marquee from '@/components/geo/Marquee';
import Link from 'next/link';
import Panel from '@/components/geo/Panel';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - File Not Found | Jeramai Faber'
};

const SUSPECTS = [
  'You typed it from memory. Bold.',
  'I moved it and told nobody.',
  'It was on a floppy and the floppy is gone.',
  'The link came from a webring that died in 2004.'
];

export default function NotFound() {
  return (
    <>
      <Marquee />

      <div className='mx-auto max-w-[900px] px-3 pb-5'>
        <header className='px-0 pt-5 pb-2 text-center'>
          <p className='hazard m-0 inline-block border-[3px] border-black p-1'>
            <span className='block bg-black px-4 py-1 font-display text-[0.95rem] tracking-[0.16em] text-[#ffd400]'>
              404 &mdash; FILE NOT FOUND
            </span>
          </p>

          <h1 className='my-1.5 font-display text-[clamp(3rem,14vw,7rem)] leading-none font-black text-accent [text-shadow:2px_2px_0_var(--head-b),4px_4px_0_#0009]'>
            404
          </h1>

          <p className='track-wide m-0 mb-2.5 font-display text-[clamp(0.8rem,2vw,1.15rem)] uppercase text-ink-dim'>
            ~ This page has left the World Wide Web ~
          </p>

          <hr className='rainbow mx-auto my-2.5 mb-5 h-2 max-w-3xl border-0' />
        </header>

        <main className='grid gap-4'>
          <Panel title='What Went Wrong'>
            <p>
              The page you asked for is not here. It may never have been here. This site has been under construction since 1997,
              so honestly, the odds were never great.
            </p>
            <ul className='m-0 list-disc pl-5'>
              {SUSPECTS.map((s) => (
                <li key={s} className='mb-1.5'>
                  {s}
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title='While You Are Here'>
            <p>
              I am Jeramai, a senior front-end developer in Eindhoven. I build interfaces, the AI features behind them, and things
              that track a human body through a phone camera.
            </p>
            <p>
              I have been interested in <b className='text-accent'>AR and VR</b> since long before it was a bullet point, which is
              how I ended up writing 3D configurators for a living. Away from a screen I am usually{' '}
              <b className='text-accent-2'>on a skateboard</b>, where a 404 also means landing on your back.
            </p>
          </Panel>

          <Panel title='Try These Instead'>
            <ul className='m-0 list-disc pl-5'>
              <li className='mb-1.5'>
                <Link href='/' className='inline-block py-1'>
                  Back to the home page
                </Link>
              </li>
              <li className='mb-1.5'>
                <Link href='/#projects' className='inline-block py-1'>
                  My projects
                </Link>
              </li>
              <li className='mb-1.5'>
                <a href='https://github.com/jeramai' target='_blank' rel='noopener noreferrer' className='inline-block py-1'>
                  My GitHub
                </a>
              </li>
            </ul>
          </Panel>
        </main>

        <footer className='mt-4 border-t-2 border-edge pt-3 text-center text-[0.82rem] text-ink-dim'>
          <p className='my-1'>Error 404. Press the back button like it is 1997.</p>
        </footer>
      </div>
    </>
  );
}
