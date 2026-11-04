import type { Metadata } from 'next';
import Link from 'next/link';
import { SHIPPING_COUNTRIES, TRANSIT_DAYS } from '@/lib/shipping';

export const metadata: Metadata = {
  title: 'Care, shipping & returns',
  description:
    'Sizing, international shipping, customs, returns and care instructions for JJH Jewelry pieces.',
};

const SECTIONS = [
  { id: 'sizing', label: 'Sizing guide' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'returns', label: 'Returns' },
  { id: 'care', label: 'Care' },
];

export default function FaqPage() {
  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <p className="eyebrow">Details</p>
      <h1 className="display mt-6">
        Care, shipping
        <br />
        <em className="text-burgundy">&amp; returns.</em>
      </h1>

      <nav className="mt-12 flex flex-wrap gap-7 border-y border-line py-4 text-[11px] uppercase tracking-[0.18em]">
        {SECTIONS.map((s) => (
          <a key={s.id} href={`#${s.id}`} className="link-rule pb-1 text-walnut/60 hover:text-burgundy">
            {s.label}
          </a>
        ))}
      </nav>

      <section id="sizing" className="scroll-mt-24 py-12">
        <h2 className="text-2xl">Sizing guide</h2>

        <h3 className="mt-8 font-serif text-xl text-forest">Ring sizes</h3>
        <p className="mt-3 text-walnut/80">
          We list US ring sizes, measured with a jeweler&apos;s mandrel. Because
          these are pre-loved, a listed size 6 may sit between a 6 and a 6¼. If the
          fit matters, ask before buying — we&apos;ll measure the exact inner
          diameter in millimetres.
        </p>
        <table className="mt-6 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-line text-left">
              <th className="py-2 font-medium">US</th>
              <th className="py-2 font-medium">UK</th>
              <th className="py-2 font-medium">Inner diameter</th>
            </tr>
          </thead>
          <tbody className="text-walnut/75">
            {[
              ['5', 'J½', '15.7 mm'],
              ['6', 'L½', '16.5 mm'],
              ['7', 'N½', '17.3 mm'],
              ['8', 'P½', '18.1 mm'],
              ['9', 'R½', '18.9 mm'],
            ].map(([us, uk, mm]) => (
              <tr key={us} className="border-b border-line/60">
                <td className="py-2">{us}</td>
                <td className="py-2">{uk}</td>
                <td className="py-2">{mm}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-sm text-walnut/60">
          Most of our rings can be resized by a local jeweler, but resizing a
          vintage band can affect a hallmark or an engraved pattern. Ask us first
          and we&apos;ll tell you honestly whether it&apos;s advisable.
        </p>

        <h3 className="mt-10 font-serif text-xl text-forest">Necklace lengths</h3>
        <ul className="mt-3 space-y-2 text-walnut/80">
          <li><strong className="font-medium">Choker:</strong> 14–16 in — sits at the base of the throat.</li>
          <li><strong className="font-medium">Princess:</strong> 18 in — the most common, falls at the collarbone.</li>
          <li><strong className="font-medium">Matinee:</strong> 20–24 in — sits on the chest.</li>
          <li><strong className="font-medium">Opera:</strong> 28–34 in — below the bust, often doubled.</li>
        </ul>
        <p className="mt-4 text-sm text-walnut/60">
          Lengths are measured end to end including the clasp. Bracelets and
          bangles are listed by inner circumference.
        </p>
      </section>

      <section id="shipping" className="scroll-mt-24 border-t border-line py-12">
        <h2 className="text-2xl">International shipping</h2>
        <p className="mt-4 text-walnut/80">
          We ship from the United States to the destinations below. Everything is
          sent tracked and insured for the full purchase value, in discreet
          packaging.
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="border border-line p-4 text-sm">
            <p className="font-medium">United States</p>
            <p className="mt-1 text-walnut/70">{TRANSIT_DAYS.domestic}</p>
          </div>
          <div className="border border-line p-4 text-sm">
            <p className="font-medium">GCC</p>
            <p className="mt-1 text-walnut/70">{TRANSIT_DAYS.gcc}</p>
          </div>
          <div className="border border-line p-4 text-sm">
            <p className="font-medium">Rest of world</p>
            <p className="mt-1 text-walnut/70">{TRANSIT_DAYS.international}</p>
          </div>
        </div>

        <p className="mt-6 text-sm text-walnut/70">
          Destinations we currently ship to:
        </p>
        <p className="mt-2 text-sm text-walnut/80">{SHIPPING_COUNTRIES.join(' · ')}</p>

        <div className="mt-8 border-l-2 border-burgundy bg-sand/60 p-5 text-sm">
          <p className="font-medium text-forest">Customs and duties</p>
          <p className="mt-2 text-walnut/80">
            Import duties, taxes and any customs handling fees are the
            buyer&apos;s responsibility and are <strong>not</strong> included in
            the price or the shipping charge. They are collected by the carrier or
            the customs authority in your country at delivery. If you refuse a
            parcel because of duties, the return shipping cost and any fees are
            deducted from your refund.
          </p>
        </div>

        <p className="mt-6 text-sm text-walnut/60">
          Shipping is a flat rate per order, calculated at checkout from your
          destination. Orders are dispatched within two business days.
        </p>
      </section>

      <section id="returns" className="scroll-mt-24 border-t border-line py-12">
        <h2 className="text-2xl">Returns</h2>
        <div className="mt-4 space-y-4 text-walnut/80">
          <p>
            <strong className="font-medium text-forest">
              We do not accept returns for change of mind.
            </strong>{' '}
            Every piece is one-of-one, sold as described, and photographed from
            several angles including any flaws. Please read the condition report
            and ask questions before you buy.
          </p>
          <p>
            <strong className="font-medium text-forest">
              We do accept returns for items not as described.
            </strong>{' '}
            If the piece arrives materially different from its listing — the wrong
            item, undisclosed damage, or a stone that is loose when the listing
            said it was secure — contact us within <strong>3 days</strong> of
            delivery with photographs. We will arrange return shipping and refund
            you in full once the piece is back in our hands.
          </p>
          <p>
            Items must be returned unworn, in their original packaging, with any
            included paperwork. We recommend insured, tracked post — we cannot
            refund a parcel that goes missing in transit.
          </p>
          <p className="text-sm text-walnut/70">
            Refunds are issued to the original payment method within 5 business
            days of the return being received and inspected. Shipping costs and
            duties are non-refundable except when the item was misdescribed.
          </p>
        </div>
      </section>

      <section id="care" className="scroll-mt-24 border-t border-line py-12">
        <h2 className="text-2xl">Care</h2>
        <ul className="mt-4 space-y-3 text-walnut/80">
          <li>
            <strong className="font-medium text-forest">Wear it last.</strong> Perfume,
            hairspray and lotions dull stones and gold. Put jewelry on after
            cosmetics, take it off before bed.
          </li>
          <li>
            <strong className="font-medium text-forest">Keep it dry.</strong> Remove
            before swimming, showering and washing up. Chlorine and hot water are
            unkind to both settings and pearls.
          </li>
          <li>
            <strong className="font-medium text-forest">Clean gently.</strong> Warm
            water, a drop of mild soap, and a soft brush. Rinse and dry with a
            lint-free cloth. Never use ultrasonic cleaners on pearls, opals,
            emeralds or glued settings.
          </li>
          <li>
            <strong className="font-medium text-forest">Store separately.</strong>{' '}
            Soft pouches or lined compartments stop pieces scratching each other.
            Silver tarnishes faster in humid air — a silica pack helps.
          </li>
          <li>
            <strong className="font-medium text-forest">Check settings yearly.</strong>{' '}
            Have a jeweler tighten prongs on anything worn often.
          </li>
        </ul>
      </section>

      <p className="border-t border-line pt-8 text-sm text-walnut/70">
        Something not covered here?{' '}
        <Link href="/contact" className="text-burgundy underline underline-offset-4">
          Ask us directly
        </Link>
        .
      </p>
    </div>
  );
}
