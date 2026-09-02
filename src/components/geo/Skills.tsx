const GROUPS: { label: string; items: string[] }[] = [
  {
    label: 'Front-end',
    items: ['React', 'Next.js', 'React Native', 'Expo', 'TypeScript', 'Tailwind CSS', 'NativeWind', 'SCSS', 'Three.js', 'Motion']
  },
  {
    label: 'Craft',
    items: [
      'Design systems',
      'Storybook',
      'Accessibility',
      'Performance',
      'i18n',
      'Component APIs',
      'Jest',
      'Vitest',
      'Playwright'
    ]
  },
  {
    label: 'AI and vision',
    items: [
      'Anthropic SDK',
      'Agent workflows',
      'LLM product features',
      'TensorFlow.js pose detection',
      'TFLite on device',
      'Vision Camera',
      'Evals'
    ]
  },
  {
    label: 'Back-end, when needed',
    items: ['NestJS', 'Node.js', 'Laravel', 'PHP', 'Python', 'MySQL', 'Zod', 'REST and BFF design']
  },
  {
    label: 'Toolchain',
    items: ['Bun', 'Zig', 'oxlint', 'oxfmt', 'Playwright', 'CI gates', 'Monorepos']
  },
  {
    label: 'Running it in production',
    items: ['Sentry', 'OpenTelemetry', 'Ably realtime', 'Feature flags']
  }
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
