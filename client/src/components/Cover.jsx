import { useState, useEffect } from 'react'
import { config } from '../config'
import CoverBackground from './CoverBackground'


export default function Cover({ onOpen, onMusicStart }) {
  const [visible, setVisible] = useState(false)
  const [isOpening, setIsOpening] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150)
    return () => clearTimeout(t)
  }, [])

  const handleOpen = () => {
    if (onMusicStart) onMusicStart()
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 1500)
  }

  const { groom, bride, reception } = config
  const date = new Date(reception.date)
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}`

  const Content = (
    <div className="relative h-full flex flex-col overflow-hidden w-full bg-cream">
      {/* ── Background layer (tukar dalam config.js → cover) ── */}
      <CoverBackground />

      {/* ── Top floral ── */}
      <div
        className={`relative z-10 transition-all duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
        style={{ marginBottom: '-20px' }}
      >

      </div>

      {/* ── Main content ── */}
      <div
        className={`relative z-10 flex-1 flex flex-col items-center justify-start px-8 pt-[12vh] text-center transition-all duration-1000 delay-300 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
      >
        {/* Bismillah */}
        <p className="arabic text-3xl text-cream leading-loose mb-3">
          بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
        </p>

        {/* Label */}
        <p className="font-sans text-[9px] tracking-[0.36em] uppercase text-pink mb-4">
          The wedding of
        </p>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-4 w-full max-w-[220px]">
          <div className="flex-1 h-px bg-pink-light/70" />
          <svg className="w-3 h-3 text-pink/70 rotate-45" viewBox="0 0 10 10" fill="currentColor">
            <rect width="10" height="10" />
          </svg>
          <div className="flex-1 h-px bg-pink-light/70" />
        </div>

        {/* Names */}
        <h1 className={`font-script text-[56px] leading-none text-brown mb-1 transition-all duration-1000 delay-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {bride.name}
        </h1>
        <p className="font-script text-4xl text-pink italic my-1 font-bold">&amp;</p>
        <h1 className={`font-script text-[56px] leading-none text-brown mb-4 transition-all duration-1000 delay-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {groom.name}
        </h1>

        {/* Decorative line */}
        <div className="flex items-center gap-3 mb-5 w-full max-w-[220px]">
          <div className="flex-1 h-px bg-pink-light/70" />
          <svg className="w-2.5 h-2.5 text-pink/70" viewBox="0 0 10 10" fill="currentColor">
            <circle cx="5" cy="5" r="4" />
          </svg>
          <div className="flex-1 h-px bg-pink-light/70" />
        </div>

        {/* Date */}
        <p className="font-serif italic text-cream-pink text-2xl font-bold">{reception.dayName}</p>
        <p className="font-sans text-[20px] tracking-[0.3em] text-pink mt-1 uppercase font-bold">
          {formattedDate}
        </p>

        {/* CTA */}
        <button
          onClick={handleOpen}
          className={`mt-8 group relative inline-flex items-center gap-2 px-10 py-3.5 border border-pink/70 text-pink font-sans text-[10px] tracking-[0.26em] uppercase hover:bg-pink hover:text-cream hover:border-pink transition-all duration-300 ${isOpening ? 'opacity-0 scale-90' : 'opacity-100 scale-100'}`}
        >
          You are invited!
          <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M2 6 L10 6 M7 3 L10 6 L7 9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <p className="mt-5 font-sans text-[13px] tracking-[0.22em] text-black-mid/30 uppercase font-bold">
          #fainallywithayda
        </p>
      </div>
    </div>
  )

  return (
    <div className="absolute inset-0 z-50">
      {/* ── Original unified content (handles interactions before opening) ── */}
      <div className={`absolute inset-0 z-40 transition-opacity duration-0 ${isOpening ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'}`}>
        {Content}
      </div>

      {/* ── Split Doors (only visible during animation) ── */}
      <div className={`absolute inset-0 z-50 flex overflow-hidden pointer-events-none transition-opacity duration-0 ${isOpening ? 'opacity-100' : 'opacity-0'}`}>
        {/* Left door */}
        <div
          className="relative w-1/2 h-full overflow-hidden"
          style={{
            transition: 'transform 1.5s cubic-bezier(0.7, 0, 0.3, 1)',
            transform: isOpening ? 'translateX(-100%)' : 'translateX(0)',
          }}
        >
          <div className="absolute top-0 left-0 h-full w-[200%]">
            {Content}
          </div>
        </div>

        {/* Right door */}
        <div
          className="relative w-1/2 h-full overflow-hidden"
          style={{
            transition: 'transform 1.5s cubic-bezier(0.7, 0, 0.3, 1)',
            transform: isOpening ? 'translateX(100%)' : 'translateX(0)',
          }}
        >
          <div className="absolute top-0 right-0 h-full w-[200%]">
            {Content}
          </div>
        </div>
      </div>

      {/* Magic smoke effect */}
      {isOpening && (
        <div
          className="absolute inset-0 pointer-events-none z-[60] animate-magic-smoke"
          style={{
            background: 'radial-gradient(circle, rgba(253, 246, 240, 0.9) 0%, rgba(253, 246, 240, 0) 70%)',
          }}
        />
      )}
    </div>
  )
}
