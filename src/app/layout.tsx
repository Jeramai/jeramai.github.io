import { STORAGE_KEY } from '@/lib/theme-store';
import themes from '@/lib/themes.generated';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jeramai.github.io'),
  title: 'Jeramai Faber - My Home Page on the World Wide Web',
  description: 'The official home page of Jeramai Faber, full stack developer. Under construction forever. Now with 99 themes.',
  openGraph: {
    type: 'website',
    url: 'https://jeramai.github.io',
    title: 'Jeramai Faber - My Home Page on the World Wide Web',
    description: 'Full stack developer. Under construction forever. Now with 99 themes.'
  }
};

const ids = JSON.stringify(themes.map((t) => t.id));

const bootstrap = `(function(){try{var i=${ids};var s=localStorage.getItem(${JSON.stringify(STORAGE_KEY)});var t=i.indexOf(s)<0?i[Math.floor(Math.random()*i.length)]:s;document.documentElement.dataset.theme=t;}catch(e){}})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <head>
        <script dangerouslySetInnerHTML={{ __html: bootstrap }} />
      </head>
      <body className='antialiased'>{children}</body>
    </html>
  );
}
