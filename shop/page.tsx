import type { CSSProperties } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { Reveal } from '@/components/reveal';
import { getFacets, getProducts } from '@/lib/products';
import { formatPrice, toMinor } from '@/lib/money';
import type { ProductCategory } from '@/lib/types';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Browse one-of-a-kind pre-loved and vintage jewelry.',
};

export const revalidate = 60;

type SearchParams = Record<string, string | string[] | undefined>;

const CATEGORY_LABELS: Record<string, string> = {
  ring: 'Rings',
  necklace: 'Necklaces',
  earring: 'Earrings',
  brooch: 'Brooches',
  other: 'Other',
};

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const category = first(searchParams.category);
  const metal = first(searchParams.metal);
  const stone = first(searchParams.stone);
  const era = first(searchParams.era);
  const sort = first(searchParams.sort);
  const min = first(searchParams.min);
  const max = first(searchParams.max);

  // Price inputs are entered in whole KWD and compared in minor units.
  const minMinor = min && !Number.isNaN(Number(min)) ? toMinor(Number(min), 'KWD') : undefined;
  const maxMinor = max && !Number.isNaN(Number(max)) ? toMinor(Number(max), 'KWD') : undefined;

  const [products, facets] = await Promise.all([
    getProducts({
      category: category as ProductCategory | undefined,
      metal,
      stone,
      era,
      minMinor,
      maxMinor,
      sort: sort === 'price-asc' || sort === 'price-desc' ? sort : undefined,
    }),
    getFacets(),
  ]);

  const hasFilters = Boolean(category || metal || stone || era || min || max || sort);

  type Chip = { key: string; label: string };
  const chips: Chip[] = [];
  if (category) chips.push({ key: 'category', label: CATEGORY_LABELS[category] ?? category });
  if (era) chips.push({ key: 'era', label: era });
  if (metal) chips.push({ key: 'metal', label: metal });
  if (stone) chips.push({ key: 'stone', label: stone });
  if (min) chips.push({ key: 'min', label: `min ${min} KWD` });
  if (max) chips.push({ key: 'max', label: `max ${max} KWD` });
  if (sort) chips.push({ key: 'sort', label: sort === 'price-asc' ? 'Price ↑' : 'Price ↓' });

  /** Same query string with one filter dropped, so a chip can remove itself. */
  function hrefWithout(keyToRemove: string): string {
    const params = new URLSearchParams();
    for (const [key, raw] of Object.entries(searchParams)) {
      const value = first(raw);
      if (!value || key === keyToRemove) continue;
      params.set(key, value);
    }
    const query = params.toString();
    return query ? `/shop?${query}` : '/shop';
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-14">
      <header className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="eyebrow">The collection</p>
          <h1 className="display mt-5">
            <span className="line-mask" style={{ '--i': 0 } as CSSProperties}>
              <span>Every piece,</span>
            </span>
            <span className="line-mask" style={{ '--i': 1 } as CSSProperties}>
              <span>
                <em className="text-burgundy">once.</em>
              </span>
            </span>
          </h1>
        </div>
        <p className="max-w-sm text-walnut/70 lg:pb-2">
          Each item exists in a single size and a single condition. Filters are
          here to narrow a small collection, not to sort a warehouse.
        </p>
      </header>

      {/* Plain GET form: filtering works without JavaScript. */}
      <form
        action="/shop"
        method="get"
        className="mt-10 grid gap-5 border-b border-line pb-8 sm:grid-cols-2 lg:grid-cols-6"
      >
        <label className="text-sm">
          <span className="eyebrow block pb-2">Category</span>
          <select name="category" defaultValue={category ?? ''} className="field">
            <option value="">All</option>
            {facets.categories.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c] ?? c}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="eyebrow block pb-2">Era</span>
          <select name="era" defaultValue={era ?? ''} className="field">
            <option value="">All</option>
            {facets.eras.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="eyebrow block pb-2">Metal</span>
          <select name="metal" defaultValue={metal ?? ''} className="field">
            <option value="">All</option>
            {facets.metals.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </label>

        <label className="text-sm">
          <span className="eyebrow block pb-2">Stone</span>
          <select name="stone" defaultValue={stone ?? ''} className="field">
            <option value="">All</option>
            {facets.stones.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <div className="text-sm">
          <span className="eyebrow block pb-2">
            Price (KWD){' '}
            <span className="normal-case tracking-normal text-walnut/40">
              {formatPrice(facets.priceRange.minMinor)}–{formatPrice(facets.priceRange.maxMinor)}
            </span>
          </span>
          <div className="flex gap-2">
            <input
              type="number"
              name="min"
              min={0}
              placeholder="Min"
              defaultValue={min ?? ''}
              className="field"
              aria-label="Minimum price in KWD"
            />
            <input
              type="number"
              name="max"
              min={0}
              placeholder="Max"
              defaultValue={max ?? ''}
              className="field"
              aria-label="Maximum price in KWD"
            />
          </div>
        </div>

        <label className="text-sm">
          <span className="eyebrow block pb-2">Sort</span>
          <select name="sort" defaultValue={sort ?? ''} className="field">
            <option value="">Featured</option>
            <option value="price-asc">Price: low to high</option>
            <option value="price-desc">Price: high to low</option>
          </select>
        </label>

        <div className="sm:col-span-2 lg:col-span-6 flex items-center gap-5 pt-1">
          <button type="submit" className="btn-primary py-2.5">
            Apply
          </button>
          {hasFilters && (
            <Link href="/shop" className="text-sm text-walnut/60 hover:text-burgundy">
              Clear filters
            </Link>
          )}
          <p className="ml-auto text-xs text-walnut/50">
            {products.length} {products.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>
      </form>

      {chips.length > 0 && (
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-walnut/40">
            Filtered by
          </span>
          {chips.map((chip) => (
            <a
              key={chip.key}
              href={hrefWithout(chip.key)}
              className="group inline-flex items-center gap-2 border border-line px-3 py-1.5 text-xs text-walnut transition-colors hover:border-burgundy hover:text-burgundy"
            >
              {chip.label}
              <span aria-hidden className="text-walnut/35 group-hover:text-burgundy">
                ×
              </span>
            </a>
          ))}
          <Link
            href="/shop"
            className="ml-1 text-xs text-walnut/50 underline underline-offset-4 hover:text-burgundy"
          >
            Clear all
          </Link>
        </div>
      )}

      {products.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-serif text-2xl text-forest">Nothing matches those filters.</p>
          <p className="mt-3 text-walnut/70">
            With one-of-one stock that happens often.{' '}
            <Link href="/shop" className="text-burgundy underline underline-offset-4">
              Show everything
            </Link>
            .
          </p>
        </div>
      ) : (
        <div className="mt-12 grid grid-cols-1 gap-x-10 gap-y-16 md:grid-cols-2">
          {products.map((product, index) => (
            <Reveal
              key={product.id}
              delay={index * 60}
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
    </div>
  );
}
