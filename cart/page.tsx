'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { cartCurrency, cartSubtotal, useCart } from '@/lib/cart';
import { formatPrice } from '@/lib/money';
import { INTERNATIONAL_RATE_MINOR } from '@/lib/shipping';

export default function CartPage() {
  const lines = useCart((s) => s.lines);
  const remove = useCart((s) => s.remove);
  const [mounted, setMounted] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => setMounted(true), []);

  const currency = cartCurrency(lines) ?? 'KWD';
  const subtotal = cartSubtotal(lines);
  // Flat international rate; the server applies the same figure.
  const estimate = lines.length > 0 ? INTERNATIONAL_RATE_MINOR : 0;

  async function checkout() {
    setPending(true);
    setError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ productIds: lines.map((l) => l.productId) }),
      });

      const data = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !data.url) {
        setError(
          data.error === 'payments_not_configured'
            ? 'Checkout is not configured yet (missing STRIPE_SECRET_KEY).'
            : data.error === 'mixed_currency'
              ? 'Your cart contains pieces priced in different currencies, which cannot share one checkout.'
              : data.error === 'unavailable'
                ? 'One of these pieces was just reserved by someone else. Remove it and try again.'
                : 'Something went wrong starting checkout. Please try again.',
        );
        return;
      }

      window.location.href = data.url;
    } catch {
      setError('Network error starting checkout. Please try again.');
    } finally {
      setPending(false);
    }
  }

  // Server HTML renders the empty state; wait for rehydration before deciding.
  if (!mounted) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-20">
        <h1>Your cart</h1>
        <p className="mt-6 text-walnut/60">Loading…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-5 py-16">
      <h1>Your cart</h1>

      {lines.length === 0 ? (
        <div className="mt-8">
          <p className="text-walnut/70">
            Nothing here yet. With one-of-one stock, the pieces you like tend to
            disappear.
          </p>
          <Link href="/shop" className="btn-primary mt-8">
            Browse the collection
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-10 divide-y divide-line border-y border-line">
            {lines.map((line) => (
              <li key={line.productId} className="flex gap-5 py-6">
                <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-sand">
                  {line.imageUrl ? (
                    <Image
                      src={line.imageUrl}
                      alt={line.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  ) : null}
                </div>

                <div className="flex flex-1 flex-wrap items-start justify-between gap-3">
                  <div>
                    <Link
                      href={`/product/${line.slug}`}
                      className="font-serif text-lg text-forest hover:text-burgundy"
                    >
                      {line.name}
                    </Link>
                    {line.era && (
                      <p className="mt-1 text-xs uppercase tracking-[0.16em] text-walnut/50">
                        {line.era}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-5">
                    <p className="text-sm">{formatPrice(line.priceMinor, line.currency)}</p>
                    <button
                      type="button"
                      onClick={() => remove(line.productId)}
                      className="text-xs uppercase tracking-[0.16em] text-walnut/50 hover:text-burgundy"
                      aria-label={`Remove ${line.name} from cart`}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-walnut/70">Subtotal</span>
              <span>{formatPrice(subtotal, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-walnut/70">Shipping (flat, international)</span>
              <span>{formatPrice(estimate, currency)}</span>
            </div>
            <div className="flex justify-between border-t border-line pt-3 text-base">
              <span>Estimated total</span>
              <span className="text-burgundy">
                {formatPrice(subtotal + estimate, currency)}
              </span>
            </div>
            <p className="pt-2 text-xs text-walnut/50">
              Final shipping and any duties are calculated at checkout and import.
            </p>
          </div>

          {error && (
            <p className="mt-6 border border-burgundy/40 bg-burgundy/5 px-4 py-3 text-sm text-burgundy">
              {error}
            </p>
          )}

          <p className="mt-6 text-xs text-walnut/60">
            Checking out reserves these pieces for 30 minutes.
          </p>

          <button
            type="button"
            onClick={checkout}
            disabled={pending}
            className="btn-primary mt-4 w-full"
          >
            {pending ? 'Reserving…' : 'Checkout'}
          </button>
        </>
      )}
    </div>
  );
}
