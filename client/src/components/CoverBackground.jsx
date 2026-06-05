/**
 * CoverBackground.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Komponen background berasingan untuk halaman Cover.
 *
 * Cara guna – dalam config.js, bahagian "cover":
 *
 *   cover: {
 *     image: 'cover-bg.jpg',        // gambar latar (null = pakai gradient)
 *     imageOpacity: 0.85,            // kelegapan gambar (0.0–1.0)
 *     gradientFrom: '#FFF6EE',       // warna gradient atas (jika tiada gambar)
 *     gradientTo:   '#F5EAD7',       // warna gradient bawah (jika tiada gambar)
 *     overlay: 'rgba(255,240,230,0.40)', // overlay warna (null = tiada)
 *     overlayImage: 'overlay.png',   // overlay PNG khas Cover (null = tiada)
 *   }
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

import { config } from '../config'

export default function CoverBackground() {
  const cover = config.cover ?? {}

  const {
    image        = null,
    imageOpacity = 1,
    gradientFrom = '#FFF6EE',
    gradientTo   = '#F5EAD7',
    overlay      = 'rgba(255, 240, 230, 0.35)',
    overlayImage = null,
  } = cover

  return (
    <>
      {/* ── Layer 1: gambar atau gradient ── */}
      {image ? (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${image})`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: imageOpacity,
            zIndex: 0,
          }}
        />
      ) : (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: `linear-gradient(160deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
            zIndex: 0,
          }}
        />
      )}

      {/* ── Layer 2: overlay warna (opsional) ── */}
      {overlay && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: overlay,
            zIndex: 1,
          }}
        />
      )}

      {/* ── Layer 3: overlay gambar/PNG khas Cover (berasingan dari background.overlay) ── */}
      {overlayImage && (
        <img
          src={overlayImage}
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            pointerEvents: 'none',
            zIndex: 2,
            mixBlendMode: 'multiply',
          }}
        />
      )}
    </>
  )
}
