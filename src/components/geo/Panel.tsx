import type { ReactNode } from 'react';

type Props = Readonly<{ id?: string; title: string; children: ReactNode }>;

export default function Panel({ id, title, children }: Props) {
  return (
    <section id={id} className='edge theme-shadow overflow-hidden bg-panel scroll-mt-14'>
      <h2 className='head-gradient m-0 px-3.5 py-2 font-display text-base font-bold uppercase'>{title}</h2>
      <div className='space-y-3 p-4'>{children}</div>
    </section>
  );
}
