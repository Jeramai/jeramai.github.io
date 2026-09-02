import projects from '@/lib/projects';
import Image from 'next/image';

export default function ProjectList() {
  return (
    <div className='grid gap-3.5'>
      {projects.map((p) => (
        <article key={p.title} className='edge-thin grid gap-3.5 bg-panel-2 p-3 sm:grid-cols-[148px_minmax(0,1fr)]'>
          <div className='relative h-24 w-full'>
            <Image src={p.image} alt='' fill sizes='148px' className='edge-thin object-cover' />
            {p.aiImage ? (
              <span
                title='This image is generated using AI.'
                className='head-gradient absolute top-0 right-1 px-1.5 py-0.5 text-[0.65rem] font-bold'
              >
                AI
              </span>
            ) : null}
          </div>

          <div className='min-w-0'>
            <h3 className='m-0 mb-0.5 font-display text-[1.05rem] tracking-wide text-accent'>{p.title}</h3>
            <p className='m-0 mb-2 text-xs uppercase text-ink-dim'>{p.category}</p>
            <p className='m-0 mb-2 text-sm'>{p.description}</p>

            <div className='mb-2 flex flex-wrap gap-1.5'>
              {p.tags
                .toSorted((a, b) => a.localeCompare(b))
                .map((tag) => (
                  <span key={tag} className='edge-thin bg-panel px-2 py-0.5 text-[0.7rem] uppercase text-ink-dim'>
                    {tag}
                  </span>
                ))}
            </div>

            <div className='flex flex-wrap gap-2'>
              {p.github ? (
                <a href={p.github} className='geo-btn' target='_blank' rel='noopener noreferrer'>
                  [ Code ]
                </a>
              ) : null}
              {p.demo ? (
                <a href={p.demo} className='geo-btn' target='_blank' rel='noopener noreferrer'>
                  [ Demo ]
                </a>
              ) : null}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
