import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Hero3D } from '@/components/hero-3d';
import { HeroParallax } from '@/components/hero-parallax';
import { HeroSpotlight } from '@/components/hero-spotlight';
import { IndexList } from '@/components/index-list';
import { Magnetic } from '@/components/magnetic';
import { ProductCard } from '@/components/product-card';
import { Reveal } from '@/components/reveal';
import { getFeaturedProducts, getRecentlySold } from '@/lib/products';
import { formatPrice } from '@/lib/money';
import { SHIPPING_COUNTRIES } from '@/lib/shipping';

export const revalidate = 60;

const MARQUEE = [
  'One of one',
  'Restored by hand',
  'Documented honestly',
  'Ships worldwide',
  'Previously loved',
];

export default async function HomePage() {
  const [featured, sold] = await Promise.all([
    getFeaturedProducts(6),
    getRecentlySold(4),
  ]);

  const heroFallback = featured[0]?.images[0]?.url ?? null;
  const available = featured.length;

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="grain relative isolate overflow-hidden bg-forest text-ivory">
        {/* Silk backdrop — landing page only. The rest of the site stays flat
            forest so the photograph reads as one deliberate moment rather than
            wallpaper. The horizontal scrim runs opaque-left → clear-right:
            the copy sits on the dark side, the 3D piece on the lit side. */}
        <div aria-hidden className="absolute inset-0 -z-10">
          {/* `unoptimized` on purpose: the file is already a 2000px WebP at
              45 kB, and sending it through the optimiser re-encoded it into an
              85 kB JPEG. Served directly it stays one request, 45 kB, and
              keeps the priority preload. */}
          <Image
            src="/hero-silk.webp"
            alt=""
            fill
            priority
            unoptimized
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Measured mean luminance is 31/41/33 across the thirds, so the
              photograph is already dark enough for ivory text; the scrim only
              has to protect the copy column, not smother the folds. */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest/95 via-forest/70 to-forest/15" />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/45 via-transparent to-forest/65" />
        </div>

        {/* Oversized ghost wordmark: depth without another image request. */}
        <div
          aria-hidden
          className="ghost-wordmark pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 select-none font-serif text-[24rem] leading-none lg:block"
        >
          JJH
        </div>

        <HeroSpotlight />

        <div className="relative mx-auto grid min-h-[84vh] max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
          <div className="animate-fade-up">
            <p className="eyebrow text-ivory/45">
              Est. Kuwait · Now shipping from the United States
            </p>

            <h1 className="display mt-8 text-ivory">
              <span className="line-mask" style={{ '--i': 0 } as CSSProperties}>
                <span>One of one,</span>
              </span>
              <span className="line-mask" style={{ '--i': 1 } as CSSProperties}>
                <span>
                  <em className="text-[#e9dcc0]">never again.</em>
                </span>
              </span>
            </h1>

            <p className="mt-8 max-w-md text-lg leading-relaxed text-ivory/70">
              A rotating collection of pre-loved jewelry. Every piece is singular,
              documented down to the hallmark, and cleaned by a jeweler before it
              reaches you.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-7">
              <Magnetic>
                <Link
                  href="/shop"
                  className="btn-primary bg-ivory text-forest hover:bg-white hover:text-forest"
                >
                  Shop the collection
                </Link>
              </Magnetic>
              <Link
                href="/about"
                className="link-rule text-[11px] uppercase tracking-[0.22em] text-ivory/75 hover:text-white"
              >
                Our story
              </Link>
            </div>

            <dl className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-ivory/15 pt-7">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                  Available
                </dt>
                <dd className="mt-2 font-serif text-2xl text-ivory">
                  {available}
                  <span className="text-ivory/40"> pcs</span>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                  Ships to
                </dt>
                <dd className="mt-2 font-serif text-2xl text-ivory">
                  {SHIPPING_COUNTRIES.length}
                  <span className="text-ivory/40"> countries</span>
                </dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-ivory/40">
                  Restocked
                </dt>
                <dd className="mt-2 font-serif text-2xl text-ivory">Never</dd>
              </div>
            </dl>
          </div>

          <div className="relative h-[340px] lg:h-[540px]">
            <div aria-hidden className="hero-glow pointer-events-none absolute inset-0" />
            <HeroParallax>
              <Hero3D fallbackImage={heroFallback} />
            </HeroParallax>
            <p className="pointer-events-none absolute inset-x-0 bottom-0 text-center text-[10px] uppercase tracking-[0.22em] text-ivory/35">
              Drag to turn the piece
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- marquee */}
      <div className="overflow-hidden border-y border-line bg-ivory py-4">
        <div className="marquee flex w-max gap-12 whitespace-nowrap font-serif text-sm italic text-walnut/60">
          {[0, 1].map((copy) => (
            <span key={copy} className="flex gap-12" aria-hidden={copy === 1}>
              {MARQUEE.map((item) => (
                <span key={item} className="flex items-center gap-12">
                  {item}
                  <span className="not-italic text-burgundy/50">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------ featured */}
      <section className="mx-auto max-w-6xl px-5 py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-7">
            <div>
              <p className="eyebrow flex items-center gap-3">
                <span className="tabular-nums text-burgundy">01</span>
                The selection
              </p>
              <h2 className="display-sm mt-4">Currently available</h2>
            </div>
            <Link href="/shop" className="link-rule pb-1 text-sm text-walnut hover:text-burgundy">
              View all pieces
            </Link>
          </div>
        </Reveal>

        {featured.length === 0 ? (
          <p className="mt-12 text-walnut/70">
            The collection is being photographed. Check back shortly.
          </p>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
            {featured.map((product, index) => (
              <Reveal
                key={product.id}
                delay={index * 70}
                className={index === 0 ? 'md:col-span-2' : undefined}
              >
                <ProductCard
                  product={product}
                  priority={index === 0}
                  featured={index === 0}
                />
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* ---------------------------------------------------------------- sold */}
      {sold.length > 0 && (
        <section className="border-y border-line bg-sand">
          <div className="mx-auto max-w-6xl px-5 py-20">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div>
                  <p className="eyebrow flex items-center gap-3">
                    <span className="tabular-nums text-burgundy">02</span>
                    Provenance
                  </p>
                  <h2 className="display-sm mt-4">Recently sold</h2>
                </div>
                <p className="max-w-xs text-sm text-walnut/60">
                  Pieces that have moved on. One of the quieter arguments for
                  buying pre-loved: they were loved enough to be worn.
                </p>
              </div>
            </Reveal>

            <div className="mt-12">
              <Reveal delay={80}>
                <IndexList
                  items={sold.map((product) => ({
                    slug: product.slug,
                    name: product.name,
                    meta: [product.era, product.metal, product.stone]
                      .filter(Boolean)
                      .join(' · '),
                    price: formatPrice(product.price_minor, product.currency),
                    sold: product.status === 'sold',
                    image: product.images[0]
                      ? {
                          url: product.images[0].url,
                          alt: product.images[0].alt ?? product.name,
                        }
                      : null,
                  }))}
                />
              </Reveal>
            </div>
          </div>
        </section>
      )}

      {/* --------------------------------------------------------------- story */}
      <section className="mx-auto max-w-6xl px-5 py-28">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow flex items-center gap-3">
              <span className="tabular-nums text-burgundy">03</span>
              Why pre-loved
            </p>
            <p className="display-sm mt-6 text-forest">
              Previously loved,
              <br />
              <em className="italic">ready for its next chapter.</em>
            </p>
          </Reveal>

          <Reveal delay={120}>
            <p className="dropcap text-lg leading-relaxed text-walnut/80">
              We buy pieces that were made to last — jewelry that was already old
              when you found it, and will still be here long after. Every item is
              inspected under a loupe, cleaned, and described honestly, marks and
              wear included. If a clasp is tired, the listing says so.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-walnut/80">
              The collection stays small on purpose. One of each is the model, not
              a limitation we are working around.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-7">
              <Link href="/about" className="btn-ghost">
                Read our story
              </Link>
              <Link
                href="/contact"
                className="link-rule pb-1 text-sm text-walnut hover:text-burgundy"
              >
                Ask about a piece
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
