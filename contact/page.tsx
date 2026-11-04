'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState<string | null>(null);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage(null);

    // Capture the form before awaiting: React nulls currentTarget once the
    // handler returns, so `event.currentTarget.reset()` after the fetch throws.
    const formEl = event.currentTarget;
    const form = new FormData(formEl);
    const payload = {
      name: String(form.get('name') ?? ''),
      email: String(form.get('email') ?? ''),
      body: String(form.get('body') ?? ''),
      // Honeypot: bots fill hidden fields, humans never see them.
      company: String(form.get('company') ?? ''),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setStatus('error');
        setMessage(
          data.error === 'email_not_configured'
            ? 'The contact form is not connected yet. Please email us directly at jjhjewelry@gmail.com.'
            : 'That didn\u2019t send. Please email us directly at jjhjewelry@gmail.com.',
        );
        return;
      }

      setStatus('sent');
      formEl.reset();
    } catch {
      setStatus('error');
      setMessage('Network error. Please email us directly at jjhjewelry@gmail.com.');
    }
  }

  return (
    <div className="mx-auto max-w-4xl px-5 py-16">
      <header className="grid gap-8 border-b border-line pb-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <p className="eyebrow">Contact</p>
          <h1 className="display mt-6">
            Ask us
            <br />
            <em className="text-burgundy">anything.</em>
          </h1>
        </div>
        <p className="max-w-sm text-walnut/70 lg:pb-2">
          Sizing questions, extra photographs, condition details, or a custom
          request — we answer personally, usually within a day.
        </p>
      </header>

      <div className="mt-14 grid gap-14 md:grid-cols-2">
        <div>
          <form onSubmit={onSubmit} className="space-y-5">
            <label className="block text-sm">
              <span className="eyebrow block pb-2">Your name</span>
              <input name="name" required className="field" autoComplete="name" />
            </label>

            <label className="block text-sm">
              <span className="eyebrow block pb-2">Email</span>
              <input
                name="email"
                type="email"
                required
                className="field"
                autoComplete="email"
              />
            </label>

            <label className="block text-sm">
              <span className="eyebrow block pb-2">Message</span>
              <textarea name="body" required rows={6} className="field" />
            </label>

            {/* Honeypot */}
            <div className="hidden" aria-hidden>
              <label>
                Company
                <input name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="btn-primary"
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>

            {status === 'sent' && (
              <p className="text-sm text-forest">
                Thank you — your message is on its way. We&apos;ll reply to the
                email address you gave.
              </p>
            )}
            {status === 'error' && message && (
              <p className="text-sm text-burgundy">{message}</p>
            )}
          </form>
        </div>

        <div className="space-y-6 text-sm">
          <div>
            <p className="eyebrow">Email</p>
            <a
              href="mailto:jjhjewelry@gmail.com"
              className="mt-2 block text-burgundy underline underline-offset-4"
            >
              jjhjewelry@gmail.com
            </a>
          </div>
          <div>
            <p className="eyebrow">Instagram</p>
            <a
              href="https://instagram.com/jjhjewelry"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 block text-burgundy underline underline-offset-4"
            >
              @jjhjewelry
            </a>
          </div>
          <div>
            <p className="eyebrow">Shipping from</p>
            <p className="mt-2 text-walnut/80">
              United States. International orders welcome — see the{' '}
              <a href="/faq" className="text-burgundy underline underline-offset-4">
                shipping and customs notes
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
