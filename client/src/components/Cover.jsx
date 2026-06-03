import { useState, useEffect } from 'react'
import { config } from '../config'
import { FloralTop, FloralBottom } from './FloralDecor'

// Floating flower positions — left%, top%, size(px), animation delay, opacity
const FLOATERS = [
  { x: '8%',  y: '28%', size: 22, delay: '0s',    opacity: 0.18 },
  { x: '82%', y: '22%', size: 16, delay: '1.2s',  opacity: 0.15 },
  { x: '88%', y: '55%', size: 20, delay: '2.1s',  opacity: 0.18 },
  { x: '6%',  y: '58%', size: 14, delay: '0.7s',  opacity: 0.14 },
  { x: '78%', y: '72%', size: 18, delay: '1.8s',  opacity: 0.16 },
  { x: '14%', y: '76%', size: 12, delay: '2.8s',  opacity: 0.13 },
  { x: '55%', y: '12%', size: 13, delay: '1.5s',  opacity: 0.12 },
  { x: '35%', y: '82%', size: 10, delay: '0.4s',  opacity: 0.12 },
  { x: '92%', y: '38%', size: 11, delay: '3.2s',  opacity: 0.13 },
  { x: '2%',  y: '42%', size: 13, delay: '2.4s',  opacity: 0.12 },
]

function FloatingFlower({ x, y, size, delay, opacity }) {
  const petals = [0, 72, 144, 216, 288]
  const r = size / 2
  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width: size,
        height: size,
        opacity,
        animation: `float 4s ease-in-out infinite`,
        animationDelay: delay,
        pointerEvents: 'none',
      }}
    >
      <g transform={`translate(${r},${r})`}>
        {petals.map((a) => (
          <ellipse
            key={a}
            cx={0} cy={-r * 0.52}
            rx={r * 0.36} ry={r * 0.54}
            fill="#E07898"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx={0} cy={0} r={r * 0.28} fill="#FFE8F0" />
        <circle cx={0} cy={0} r={r * 0.13} fill="#FFE08A" />
      </g>
    </svg>
  )
}

export default function Cover({ onOpen }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  const { groom, bride, reception } = config
  const date = new Date(reception.date)
  const day = date.getDate()
  const month = date.toLocaleDateString('ms-MY', { month: 'long' })
  const year = date.getFullYear()

  return (
    <div className="relative min-h-screen flex flex-col bg-cream overflow-hidden">

      {/* ── Floating flower overlay ── */}
      {visible && FLOATERS.map((f, i) => (
        <FloatingFlower key={i} {...f} />
      ))}

      {/* ── Top floral ── */}
      <div
        className={`relative z-10 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ marginBottom: '-20px' }}
      >
        <FloralTop />
      </div>

      {/* ── Main content ── */}
      <div
        className={`relative z-10 flex-1 flex flex-col items-center justify-center px-8 pb-6 text-center transition-all duration-1000 delay-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Bismillah */}
        <p className="arabic text-3xl text-matcha leading-loose mb-5">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        {/* Label */}
        <p className="font-sans text-[9px] tracking-[0.36em] uppercase text-pink mb-4">
          Walimatul Urus
        </p>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-5 w-full max-w-[220px]">
          <div className="flex-1 h-px bg-pink-light/70" />
          <svg className="w-3 h-3 text-pink/70 rotate-45" viewBox="0 0 10 10" fill="currentColor">
            <rect width="10" height="10" />
          </svg>
          <div className="flex-1 h-px bg-pink-light/70" />
        </div>

        {/* Names */}
        <h1 className={`font-script text-[64px] leading-none text-brown mb-1 transition-all duration-1000 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {bride.name}
        </h1>
        <p className="font-serif text-2xl text-matcha italic my-2">&amp;</p>
        <h1 className={`font-script text-[64px] leading-none text-brown mb-5 transition-all duration-1000 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {groom.name}
        </h1>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-5 w-full max-w-[220px]">
          <div className="flex-1 h-px bg-pink-light/70" />
          <svg className="w-2.5 h-2.5 text-matcha/60" viewBox="0 0 10 10" fill="currentColor">
            <circle cx="5" cy="5" r="4" />
          </svg>
          <div className="flex-1 h-px bg-pink-light/70" />
        </div>

        {/* Date */}
        <p className="font-serif italic text-brown-mid text-2xl">{reception.dayName}</p>
        <p className="font-sans text-[20px] tracking-[0.05em] text-matcha-deep mt-1 uppercase">
          {day} {month} {year}
        </p>

        {/* CTA */}
        <button
          onClick={onOpen}
          className="mt-10 group relative inline-flex items-center gap-2 px-10 py-3.5 border border-pink/70 text-pink font-sans text-[10px] tracking-[0.26em] uppercase hover:bg-pink hover:text-cream hover:border-pink transition-all duration-300"
        >
          Buka Jemputan
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 6 L10 6 M7 3 L10 6 L7 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="mt-5 font-sans text-[9px] tracking-[0.22em] text-brown-mid/30 uppercase">
          scroll ke bawah untuk maklumat
        </p>
      </div>

      {/* ── Bottom floral ── */}
      <div
        className={`relative z-10 transition-all duration-1000 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ marginTop: '-16px' }}
      >
        <FloralBottom />
      </div>
    </div>
  )
}
