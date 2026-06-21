import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Dony's — The only AE plugin you'll ever need",
  description:
    'Scripts, 112 motion presets, gradients, a graph editor, expressions — plus Claude AI that animates your comp on command. The only After Effects plugin you need. $30 one-time.',
  keywords: [
    'After Effects plugin',
    'motion design',
    'AE scripts',
    'text animation',
    'graph editor',
    'gradient library',
    'AI motion graphics',
    'Claude After Effects',
    'workflow panel',
  ],
  openGraph: {
    title: "Dony's — The only AE plugin you'll ever need",
    description:
      'Scripts, 112 motion presets, gradients, a graph editor & Claude AI — animating your comp on command. $30.',
    type: 'website',
    url: 'https://donys.dev',
    images: ['/images/promo/hero.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Dony's — The only AE plugin you'll ever need",
    description: 'Scripts, motion presets, gradients, a graph editor & Claude AI built in. $30.',
    images: ['/images/promo/hero.png'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
