import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AddToCart } from '@/components/add-to-cart';
import { MacroGallery } from '@/components/macro-gallery';
import { ProductViewer } from '@/components/product-viewer';
import { getProductBySlug } from '@/lib/products';
import { formatPrice } from '@/lib/money';

export const revalidate = 60;

interface PageProps {
  params: { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) return { title: 'Piece not found' };

  return {
    title: product.name,
    description: product.description.slice(0, 155),
    openGraph: {
      title: product.name,
      description: product.description.slice(0, 155),
      images: product.images[0]?.url ? [product.images[0].url] : undefined,
    },
  };
}

function Field({ label, value }: { label: string; value: string | null }) {
  if (!value) return null;
  return (
    <div className="grid gap-2 border-t border-line py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
      <dt className="text-[10px] uppercase tracking-[0.2em] text-walnut/45 sm:pt-1">
        {label}
      </dt>
      <dd className="leading-relaxed text-walnut/85">{value}</dd>
    </div>
  );
}

export default async function ProductPage({ params }: PageProps) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const sold = product.status === 'sold';

  return (
    <article className="mx-auto max-w-6xl px-5 py-10">
      <nav aria-label="Breadcrumb" className="text-xs text-walnut/50">
        <Link href="/shop" className="hover:text-burgundy">
          Shop
        </Link>
        <span aria-hidden> / </span>
        <span>{product.name}</span>
      </nav>

      <div className="mt-6 grid gap-12 lg:grid-cols-2">
        {/* ------------------------------------------------------------ viewer */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductViewer
            category={product.category}
            name={product.name}
            images={product.images}
            modelUrl={product.model_url}
          />
        </div>

        {/* -------------------------------------------------------------- info */}
        <div>
          <p className="eyebrow">
            {[product.era, product.metal, product.stone]
              .filter(Boolean)
              .join(' · ')}
          </p>
          <h1 className="display-sm mt-5">{product.name}</h1>
          <p className="mt-5 font-serif text-2xl italic tabular-nums text-burgundy">
            {formatPrice(product.price_minor, product.currency)}
          </p>

          <p className="mt-7 max-w-prose text-lg leading-relaxed text-walnut/80">
            {product.description}
          </p>

          <div className="mt-8">
            <AddToCart product={product} />
          </div>

          {sold && product.sold_at && (
            <p className="mt-3 text-xs text-walnut/50">
              Sold {new Date(product.sold_at).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              .
            </p>
          )}

          <div className="mt-14 flex items-baseline justify-between border-t border-line pt-6">
            <p className="eyebrow">The details</p>
            <p className="text-[10px] uppercase tracking-[0.2em] text-walnut/35">
              One of one
            </p>
          </div>

          <dl className="mt-1">
            <Field label="Dimensions" value={product.dimensions} />
            <Field label="Condition report" value={product.condition_report} />
            <Field label="Hallmarks & stamps" value={product.hallmarks} />
            <Field label="Provenance" value={product.provenance} />
            <Field label="What's included" value={product.what_included} />
            <Field label="Restoration notes" value={product.restoration_notes} />
          </dl>

          <p className="mt-8 text-sm text-walnut/60">
            One of one. This exact piece cannot be restocked —{' '}
            <Link href="/faq" className="text-burgundy underline underline-offset-4">
              read the returns policy
            </Link>{' '}
            before you buy.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------- gallery */}
      {product.images.length > 1 && (
        <section className="mt-24">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-line pb-6">
            <div>
              <p className="eyebrow">Macro details</p>
              <h2 className="display-sm mt-3">Look closely</h2>
            </div>
            <p className="max-w-xs text-sm text-walnut/55">
              Photographed under direct light so wear, engraving and settings are
              visible rather than flattered.
            </p>
          </div>
          <MacroGallery
            images={product.images.slice(1)}
            name={product.name}
          />
        </section>
      )}
    </article>
  );
}
