import Marquee from '@/components/geo/Marquee';
import Masthead from '@/components/geo/Masthead';
import Panel from '@/components/geo/Panel';
import ProjectList from '@/components/geo/ProjectList';
import Rail from '@/components/geo/Rail';
import Skills from '@/components/geo/Skills';

const YEARS = new Date().getFullYear() - 2013;

const FACTS: [string, string][] = [
  ['Name', 'Jeramai Faber'],
  ['Title', 'Senior Front-end Developer'],
  ['Building since', `2013 (${YEARS} years)`],
  ['Main stack', 'React, Next.js, React Native, Expo, TypeScript, Tailwind'],
  ['Also does', 'AI features, agent workflows, computer vision'],
  ['Still does', 'Back-end, when the front-end needs one'],
  ['Location', 'Eindhoven, The Netherlands'],
  ['Away from a screen', 'On a skateboard']
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

      <div className='mx-auto max-w-[1180px] px-3 pb-5'>
        <Masthead />

        <div className='grid items-start gap-4 md:grid-cols-[250px_minmax(0,1fr)]'>
          <div className='order-2 md:order-1'>
            <Rail />
          </div>

          <main className='order-1 grid min-w-0 gap-4 md:order-2'>
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
                Hi, I&apos;m Jeramai, a <b className='text-accent'>senior front-end developer</b>. I build the interfaces people
                actually use &mdash; React, Next.js and React Native &mdash; and I care about the parts nobody demos: performance,
                accessibility, and a design system that survives contact with a real product.
              </p>
              <p>
                I still write back-ends. NestJS, Node, Laravel. Just far less than I used to, and usually because the front-end
                needed one.
              </p>
              <p>
                The part I care most about now is <b className='text-accent-2'>AI, both halves of it</b>. I <b>build with it</b>:
                an AI backend-for-frontend serving real product features, agent-driven automation in production, and a
                pure-TypeScript vision pipeline that turns a phone camera into verified, counted reps. And I <b>build using it</b>{' '}
                &mdash; agent-assisted development is how I ship every day, not a demo I tried once.
              </p>
              <p>
                I have been interested in <b className='text-accent'>AR and VR</b> since long before it was a line on a job spec,
                which is how I ended up spending years on 3D configurators and WebGL. Away from a screen I am usually{' '}
                <b className='text-accent-2'>on a skateboard</b> &mdash; the other discipline where you learn by failing in public
                and getting back up.
              </p>
              <p className='text-ink-dim'>
                This whole page is an example. The 99 themes are not hand-made &mdash; a generator combines 11 moods with 14
                layout archetypes, and refuses to build if any colour pair fails its contrast target.
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

            <Panel id='skills' title='What I Am Good At'>
              <Skills />
            </Panel>

            <Panel id='projects' title='My Projects'>
              <ProjectList />
            </Panel>
          </main>
        </div>

        <footer className='mt-4 border-t-2 border-edge pt-3 text-center text-[0.82rem] text-ink-dim'>
          <p className='my-1'>&copy; {new Date().getFullYear()} Jeramai Faber. All rights reserved.</p>
          <p className='my-1'>This page has been under construction since 2013.</p>
        </footer>
      </div>
    </>
  );
}
