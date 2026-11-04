'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/lib/cart';

/**
 * Stripe returns here after a successful payment. The webhook is the source of
 * truth for the order — this page only clears the cart and says thank you.
 * If the webhook is delayed, the email still arrives shortly after.
 */
export default function CheckoutSuccessPage() {
  const clear = useCart((s) => s.clear);

  useEffect(() => {
    clear();
  }, [clear]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-24 text-center">
      <p className="eyebrow">Thank you</p>
      <h1 className="mt-3">It&apos;s yours.</h1>
      <p className="mx-auto mt-6 max-w-prose text-walnut/80">
        Your payment went through and the piece is now marked sold. A confirmation
        email is on its way with your order details. We pack and ship within two
        business days.
      </p>
      <Link href="/shop" className="btn-ghost mt-10">
        Back to the collection
      </Link>
    </div>
  );
}
