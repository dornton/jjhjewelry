import { ImageResponse } from 'next/og';

/**
 * Share card, generated at request time so it can never drift out of sync with
 * the site's own type and palette. No image asset to keep in sync, and no
 * external font fetch (so it builds offline).
 */
export const alt = 'JJH Jewelry — one of one, never again';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// The Node build of @vercel/og resolves a font file with fileURLToPath, which
// throws on Windows during prerender. The edge build has no filesystem step.
export const runtime = 'edge';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#2D4A32',
          color: '#F5F0EB',
          padding: '68px 80px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <div
            style={{
              width: 76,
              height: 76,
              borderRadius: 76,
              border: '1px solid rgba(245,240,235,0.55)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 24,
              letterSpacing: -1,
            }}
          >
            JJH
          </div>
          <div
            style={{
              fontSize: 17,
              letterSpacing: 7,
              textTransform: 'uppercase',
              opacity: 0.66,
            }}
          >
            Pre-loved jewelry
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 96, lineHeight: 1, letterSpacing: -4 }}>One of one,</div>
          <div
            style={{
              fontSize: 96,
              lineHeight: 1.02,
              letterSpacing: -4,
              color: '#E9DCC0',
              fontStyle: 'italic',
            }}
          >
            never again.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 20,
            opacity: 0.62,
            borderTop: '1px solid rgba(245,240,235,0.22)',
            paddingTop: 26,
          }}
        >
          <div>Singular · documented · restored by hand</div>
          <div>Ships worldwide</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
