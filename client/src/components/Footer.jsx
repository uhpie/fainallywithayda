import { useState, useEffect, useRef } from 'react'
import useInView from '../hooks/useInView'
import { supabase } from '../supabase'

const avatarColors = [
  'bg-pink-pale border-pink-light text-pink',
  'bg-matcha-pale border-matcha-light text-matcha-deep',
  'bg-cream border-pink-light/60 text-brown',
]

export default function Footer() {
  const [ref, visible] = useInView()
  const [wishes, setWishes] = useState([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef(null)

  async function fetchWishes() {
    setLoading(true)
    const { data, error } = await supabase
      .from('wishes')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setWishes(data)
      setIndex(0)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchWishes()
    window.addEventListener('wish-added', fetchWishes)
    return () => window.removeEventListener('wish-added', fetchWishes)
  }, [])

  const nextWish = () => {
    setFade(false)
    setTimeout(() => {
      setIndex((i) => (i + 1) % wishes.length)
      setFade(true)
    }, 300)
  }

  const prevWish = () => {
    setFade(false)
    setTimeout(() => {
      setIndex((i) => (i - 1 + wishes.length) % wishes.length)
      setFade(true)
    }, 300)
  }

  const goToWish = (targetIndex) => {
    if (targetIndex === index) return
    setFade(false)
    setTimeout(() => {
      setIndex(targetIndex)
      setFade(true)
    }, 300)
  }

  // Auto-advance slideshow
  useEffect(() => {
    if (wishes.length < 2 || isPaused) return

    timerRef.current = setInterval(() => {
      nextWish()
    }, 5000)

    return () => clearInterval(timerRef.current)
  }, [wishes, isPaused])

  const w = wishes[index]
  const colorClass = avatarColors[index % avatarColors.length]

  return (
    <footer ref={ref} className={`reveal ${visible ? 'revealed' : ''}`} style={{ position: 'relative', zIndex: 10 }}>
      <div className="section-inner">

        {/* ── Header ── */}
        <div className="text-center mb-6">
          <p className="section-eyebrow">Buku Tetamu</p>
          <h2 className="section-title">Ucapan &amp; Doa</h2>
          <p className="font-serif italic text-black-mid/50 text-xs">
            Ucapan daripada tetamu yang dikasihi
          </p>
        </div>

        {/* ── Divider ── */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-14 bg-pink-light/60" />
          <svg className="w-3 h-3 text-pink/50 rotate-45" viewBox="0 0 10 10" fill="currentColor">
            <rect width="10" height="10" />
          </svg>
          <div className="h-px w-14 bg-pink-light/60" />
        </div>

        {/* ── Wish Slideshow ── */}
        {loading ? (
          <p className="text-center font-serif italic text-black-mid/40 text-sm py-8">
            Loading...
          </p>
        ) : wishes.length > 0 ? (
          <div className="relative z-[10] min-h-[140px] flex items-center justify-center mb-6">
            <div
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
              onTouchStart={() => setIsPaused(true)}
              onTouchEnd={() => setIsPaused(false)}
              style={{
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                opacity: fade ? 1 : 0,
                transform: fade ? 'translateY(0)' : 'translateY(8px)',
              }}
              className="w-full border border-pink-light/40 p-5 bg-cream/80 backdrop-blur-sm relative"
            >
              {/* Quote mark */}
              <p className="font-serif text-pink-light text-5xl leading-none mb-1 select-none">"</p>

              {/* Message */}
              <p className="font-serif italic text-brown-mid text-sm leading-relaxed mb-4 -mt-2">
                {w.message}
              </p>

              {/* Sender */}
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                  <span className="font-serif text-sm font-semibold">
                    {w.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-sans text-[11px] font-semibold text-brown tracking-wide leading-none">
                    {w.name}
                  </p>
                  <p className="font-sans text-[9px] text-brown-mid mt-0.5">
                    {new Date(w.created_at).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
              </div>
            </div>

            {/* Controls */}
            {wishes.length > 1 && (
              <div className="absolute -bottom-6 left-0 right-0 flex justify-center items-center gap-4">
                <button onClick={prevWish} className="p-1 text-pink-light hover:text-pink transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </button>
                <div className="flex justify-center gap-1.5">
                  {wishes.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToWish(i)}
                      className={`block rounded-full transition-all duration-300 ${i === index
                          ? 'w-4 h-1.5 bg-pink'
                          : 'w-1.5 h-1.5 bg-pink-light hover:bg-pink-light/80'
                        }`}
                    />
                  ))}
                </div>
                <button onClick={nextWish} className="p-1 text-pink-light hover:text-pink transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center font-serif italic text-black-mid/40 text-sm py-6">
            Belum ada ucapan lagi.
          </p>
        )}

        {/* ── Bottom closing ── */}
        <div className="flex items-center justify-center gap-3 mt-12 mb-4">
          <div className="h-px w-14 bg-pink-light/60" />
          <svg className="w-2.5 h-2.5 text-pink/50" viewBox="0 0 10 10" fill="currentColor">
            <circle cx="5" cy="5" r="4" />
          </svg>
          <div className="h-px w-14 bg-pink-light/60" />
        </div>
        <p className="font-sans text-[9px] tracking-widest text-black-mid/25 uppercase text-center pb-10">
          Terima kasih
        </p>

      </div>
    </footer>
  )
}
