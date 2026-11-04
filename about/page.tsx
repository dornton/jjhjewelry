import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our story',
  description:
    'Why JJH Jewelry exists: one-of-a-kind pre-loved pieces, documented honestly and restored by hand.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-prose px-5 py-16">
      <p className="eyebrow">Our story</p>
      <h1 className="display mt-6">
        Previously loved,
        <br />
        <em className="text-burgundy">ready for its next chapter.</em>
      </h1>

      <div className="mt-14 space-y-6 text-lg leading-relaxed text-walnut/85">
        <p className="dropcap">
          JJH Jewelry started the way most good things do: with someone refusing
          to throw something beautiful away. Our mother spent years buying,
          wearing, and quietly rescuing jewelry — pieces with real stones, real
          gold, and a history that didn&apos;t come with a receipt.
        </p>
        <p>
          What she noticed was simple. Finding a piece that was genuinely
          beautiful, genuinely well-made, and genuinely affordable was hard.
          Estate sales were a lottery. Dealers were guarded. Online listings
          never showed the one detail that mattered: the hallmark, the wear on
          the band, whether the stone was loose.
        </p>
        <p>
          So we built the place we wished existed. Every piece is bought in
          person, inspected under a loupe, cleaned by a jeweler, and photographed
          — including the flaws. If a clasp is tired or a stone has a nick, we say
          so in the condition report. That isn&apos;t modesty; it&apos;s the whole
          point. You should know exactly what you&apos;re buying before you buy it.
        </p>
        <p>
          We keep the collection small on purpose. One of each is the model, not
          a limitation we&apos;re working around. When a piece is gone it&apos;s
          gone, and something else takes its place.
        </p>
        <p className="font-serif text-2xl leading-snug text-forest">
          Jewelry shouldn&apos;t be disposable. The best pieces already prove
          that — they&apos;ve outlived their first owner.
        </p>
      </div>

      <div className="mt-12 border-t border-line pt-8">
        <p className="text-sm text-walnut/70">
          Questions about a piece, a resize, or a custom request?{' '}
          <Link href="/contact" className="text-burgundy underline underline-offset-4">
            Write to us
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
