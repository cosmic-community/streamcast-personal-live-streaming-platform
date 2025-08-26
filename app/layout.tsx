import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import CosmicBadge from '@/components/CosmicBadge';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StreamCast - Personal Live Streaming Platform',
  description: 'Professional live streaming platform with Mux and Cosmic CMS integration',
  keywords: ['live streaming', 'video', 'broadcast', 'mux', 'cosmic cms'],
  authors: [{ name: 'StreamCast' }],
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const bucketSlug = process.env.COSMIC_BUCKET_SLUG as string;

  return (
    <html lang="en">
      <head>
        <script src="/dashboard-console-capture.js" />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen">
          {children}
        </div>
        <CosmicBadge bucketSlug={bucketSlug} />
      </body>
    </html>
  );
}