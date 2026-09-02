const GROUPS: { label: string; items: string[] }[] = [
  { label: 'Front-end', items: ['React', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'Three.js'] },
  { label: 'Craft', items: ['Design systems', 'Accessibility', 'Performance', 'Testing', 'Component APIs'] },
  { label: 'AI', items: ['Agent workflows', 'LLM product features', 'Pose + vision pipelines', 'Evals', 'Prompt design'] },
  { label: 'Back-end, when needed', items: ['NestJS', 'Node.js', 'Laravel', 'PHP', 'Python', 'MySQL'] }
];

export default function Skills() {
  return (
    <dl className='m-0 grid gap-3'>
      {GROUPS.map((g) => (
        <div key={g.label}>
          <dt className='mb-1.5 font-display text-xs tracking-wider uppercase text-accent'>{g.label}</dt>
          <dd className='m-0 flex flex-wrap gap-1.5'>
            {g.items.map((item) => (
              <span key={item} className='edge-thin bg-panel-2 px-2 py-0.5 text-[0.78rem]'>
                {item}
              </span>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
