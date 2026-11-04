import type { Metadata } from 'next';
import { Fraunces, Inter } from 'next/font/google';
import './globals.css';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { CartHydrator } from '@/components/cart-hydrator';
import { Cursor } from '@/components/cursor';
import { ScrollProgress } from '@/components/scroll-progress';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
});

export const metadata: Metadata = {
  title: {
    default: 'JJH Jewelry — Previously loved, ready for its next chapter',
    template: '%s · JJH Jewelry',
  },
  description:
    'A curated collection of one-of-a-kind pre-loved and vintage jewelry. Each piece is singular, documented, and restored by hand.',
  openGraph: {
    title: 'JJH Jewelry',
    description:
      'A curated collection of one-of-a-kind pre-loved and vintage jewelry.',
    type: 'website',
  },
  // Needed to resolve the generated Open Graph image into an absolute URL.
  // Set NEXT_PUBLIC_SITE_URL in production; localhost keeps dev warnings away.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3001',
  ),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
      <body>
        {/* Reveals start at opacity:0 and are un-hidden by JS. Without JS the
            page would be blank, so force them visible as a floor. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        {/* Rehydrates the persisted cart after mount, avoiding a mismatch
            between the server-rendered empty cart and localStorage. */}
        <CartHydrator />
        <Cursor />
        <ScrollProgress />
        <Nav />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
