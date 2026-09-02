import { THEME_PARAM } from '@/lib/theme-keys';
import themes from '@/lib/themes.generated';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://jeramai.github.io'),
  title: 'Jeramai Faber - My Home Page on the World Wide Web',
  description:
    'Jeramai Faber, senior front-end developer. React, Next.js and React Native, plus the AI that ships with them. Under construction forever. Now with 99 themes.',
  openGraph: {
    type: 'website',
    url: 'https://jeramai.github.io',
    siteName: 'Jeram.ai',
    title: 'Jeramai Faber - My Home Page on the World Wide Web',
    description: 'Senior front-end developer. React, Next.js, React Native and AI. Under construction forever.',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Jeramai Faber, under construction forever' }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jeramai Faber - My Home Page on the World Wide Web',
    description: 'Senior front-end developer. React, Next.js, React Native and AI. Under construction forever.',
    images: ['/og.png']
  }
};

const ids = JSON.stringify(themes.map((t) => t.id));

// A shared ?theme= link pins one; otherwise every load is a fresh theme, which is the point of having 99.
const bootstrap = `(function(){try{var i=${ids};var q=new URLSearchParams(location.search).get(${JSON.stringify(THEME_PARAM)});var t=i.indexOf(q)>=0?q:i[Math.floor(Math.random()*i.length)];document.documentElement.dataset.theme=t;}catch(e){}})()`;

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
