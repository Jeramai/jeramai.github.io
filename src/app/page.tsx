import Marquee from '@/components/geo/Marquee';
import Masthead from '@/components/geo/Masthead';
import Panel from '@/components/geo/Panel';
import ProjectList from '@/components/geo/ProjectList';
import Rail from '@/components/geo/Rail';

const FACTS: [string, string][] = [
  ['Name', 'Jeramai Faber'],
  ['Occupation', 'Full Stack Developer'],
  ['Location', 'The Netherlands'],
  ['Speaks', 'TypeScript, PHP, Python'],
  ['Status', 'Under construction forever']
];

const COOL_LINKS = [
  { href: 'https://github.com/jeramai', label: 'My GitHub' },
  { href: 'https://linkedin.com/in/jeramai', label: 'My LinkedIn' },
  { href: 'https://jeramai.github.io/Planet-Crashers/', label: 'Planet Crashers (my game)' },
  { href: 'https://jeramai.github.io/svg-to-3d/', label: 'SVG to 3D' }
];

export default function Home() {
  return (
    <>
      <a
        href='#welcome'
        className='sr-only focus:not-sr-only focus:absolute focus:z-[100] focus:bg-accent focus:px-3 focus:py-2 focus:text-head-ink'
      >
        Skip to content
      </a>

      <Marquee />

      <div className='mx-auto max-w-[1180px] px-3 pb-12'>
        <Masthead />

        <div className='grid items-start gap-4 md:grid-cols-[250px_minmax(0,1fr)]'>
          <Rail />

          <main className='grid min-w-0 gap-4'>
            <Panel id='welcome' title='Welcome!!!'>
              <p className='my-2 text-center font-serif text-[clamp(1.3rem,3.2vw,2rem)] font-bold italic text-accent-2'>
                &ldquo;Welcome to my website.&rdquo;
              </p>
              <p className='mb-2 text-center font-bold'>&mdash; Jeramai Faber</p>
              <p>
                You have reached the <b>OFFICIAL HOME PAGE</b> of Jeramai Faber on the <b className='text-hot'>World</b>{' '}
                <b className='text-accent'>Wide</b> <b className='text-accent-2'>Web</b>. This page is under construction FOREVER,
                so please excuse the mess and check back <u>often</u> for updates!!!
              </p>
            </Panel>

            <Panel id='about' title='About Jeramai Faber'>
              <p>
                Hi, I&apos;m Jeramai. I build web applications, mobile apps and the occasional game. I work with React, Next.js,
                Expo, Laravel and far too much Three.js.
              </p>
              <table className='my-3 w-full border-collapse'>
                <tbody>
                  {FACTS.map(([k, v]) => (
                    <tr key={k}>
                      <th className='edge-thin w-1/3 bg-panel-2 px-2.5 py-1.5 text-left font-display text-xs tracking-wider uppercase text-accent'>
                        {k}
                      </th>
                      <td className='edge-thin px-2.5 py-1.5 text-left align-top'>{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Panel>

            <Panel id='projects' title='My Projects'>
              <ProjectList />
            </Panel>

            <Panel id='work' title='Where I Work'>
              <p>
                I work at <b className='text-accent'>BAS World</b>, on the platforms that sell trucks, trailers and machinery
                across Europe.
              </p>
            </Panel>

            <Panel id='links' title='Cool Links'>
              <ul className='m-0 list-disc pl-5'>
                {COOL_LINKS.map((l) => (
                  <li key={l.href} className='mb-1.5'>
                    <a href={l.href} target='_blank' rel='noopener noreferrer'>
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </Panel>
          </main>
        </div>

        <footer className='mt-6 border-t-2 border-edge pt-4 text-center text-[0.82rem] text-ink-dim'>
          <p className='my-1'>&copy; {new Date().getFullYear()} Jeramai Faber. All rights reserved.</p>
          <p className='my-1'>This page has been under construction since 2018.</p>
        </footer>
      </div>
    </>
  );
}
