import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Dony's — The only AE plugin you'll ever need",
  description:
    'Scripts, text presets, gradients, graph editor, expression editor, and smart widgets — the only After Effects plugin you need. $30 one-time purchase.',
  keywords: [
    'After Effects plugin',
    'motion design',
    'AE scripts',
    'text animation',
    'graph editor',
    'gradient library',
    'workflow panel',
  ],
  openGraph: {
    title: "Dony's — The only AE plugin you'll ever need",
    description: 'Scripts, text presets, gradients, graph editor & more. $30.',
    type: 'website',
    url: 'https://donys.dev',
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
