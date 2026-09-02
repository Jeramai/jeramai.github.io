const AWARDS = [
  'AI-Native',
  '10× Engineer',
  'Agentic Mindset',
  'Thought Leader',
  'Prompt Whisperer',
  'Ships Relentlessly',
  'Growth Mindset',
  'Synergy Certified',
  'Disruptor',
  'Open To Work'
];

export default function Buzzwords() {
  return (
    <>
      <ul className='m-0 flex list-none flex-wrap gap-2 p-0'>
        {AWARDS.map((a) => (
          <li
            key={a}
            className='head-gradient border-2 border-edge px-2.5 py-1 text-[0.72rem] font-bold uppercase [box-shadow:inset_1px_1px_0_#fff4,inset_-1px_-1px_0_#0005]'
          >
            ★ {a}
          </li>
        ))}
      </ul>
      <p className='mt-3 mb-0 text-[0.8rem] text-ink-dim'>
        Awarded to myself, by myself, in 1999. The honest version is in{' '}
        <a href='#about' className='underline'>
          About
        </a>
        .
      </p>
    </>
  );
}
