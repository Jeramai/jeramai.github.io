import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Portfolio | Jeram.ai',
  description: 'Personal portfolio website showcasing my projects and skills'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className='antialiased dark'>{children}</body>
    </html>
  );
}
