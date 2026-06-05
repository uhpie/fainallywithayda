import { useEffect } from 'react'
import useInView from '../hooks/useInView'
import { config } from '../config'
import CoverBackground from './CoverBackground'

export default function Opening() {
  const [ref, visible] = useInView()
  const { groom, bride, reception } = config

  const date = new Date(reception.date)
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getFullYear()).slice(-2)}`

  // Auto-scroll slow motion
  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return

    let animationId
    let lastTime = performance.now()
    let currentScroll = container.scrollTop

    const scrollDown = (time) => {
      const delta = time - lastTime
      lastTime = time

      // Berhenti scroll kalau dah sampai bawah
      if (container.scrollTop + container.clientHeight < container.scrollHeight - 1) {
        currentScroll += 35 * (delta / 1000)
        container.scrollTop = currentScroll
      }
      animationId = requestAnimationFrame(scrollDown)
    }

    const t = setTimeout(() => {
      lastTime = performance.now()
      animationId = requestAnimationFrame(scrollDown)
    }, 2000) // Mula auto-scroll lepas 2 saat

    // Berhenti sepenuhnya bila user sentuh skrin
    const handleInteraction = () => {
      cancelAnimationFrame(animationId)
    }

    container.addEventListener('touchstart', handleInteraction, { passive: true })
    container.addEventListener('touchmove', handleInteraction, { passive: true })
    container.addEventListener('wheel', handleInteraction, { passive: true })
    container.addEventListener('mousedown', handleInteraction, { passive: true })

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(animationId)
      container.removeEventListener('touchstart', handleInteraction)
      container.removeEventListener('touchmove', handleInteraction)
      container.removeEventListener('wheel', handleInteraction)
      container.removeEventListener('mousedown', handleInteraction)
    }
  }, [])

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''}`} style={{ position: 'relative', zIndex: 10 }}>

      {/* ── Cover hero (sama macam Cover.jsx tapi tanpa butang) ── */}
      <div className="relative min-h-[100dvh] flex flex-col overflow-hidden">
        <CoverBackground />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-start px-8 pt-[12vh] text-center">
          {/* Bismillah */}
          <p className="arabic text-3xl text-cream leading-loose mb-3">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          {/* Label */}
          <p className="font-sans text-[9px] tracking-[0.36em] uppercase text-pink mb-4">
            Walimatul Urus
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
          <h1 className="font-script text-[56px] leading-none text-brown mb-1">
            {bride.name}
          </h1>
          <p className="font-script text-4xl text-pink italic my-1 font-bold">&amp;</p>
          <h1 className="font-script text-[56px] leading-none text-brown mb-4">
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
          <p className="font-serif italic text-cream-pink text-2xl font-bold">{reception.dayName}</p>
          <p className="font-sans text-[20px] tracking-[0.3em] text-pink mt-1 uppercase font-bold">
            {formattedDate}
          </p>

          <p className="mt-8 font-sans text-[13px] tracking-[0.22em] text-black-mid/30 uppercase font-bold">
            #fainallywithayda
          </p>
        </div>
      </div>

      {/* ── Teks jemputan ── */}
      <div className="section-inner text-center">
        <p className="font-serif italic text-black-mid text-sm mb-6">
          Assalamualaikum dan Selamat Sejahtera.<br />
          Dengan nama Allah yang Maha Pengasih lagi Maha Penyayang.
        </p>

        <p className="font-serif text-xl text-brown uppercase tracking-wide mb-1">Jasni bin Mahmood</p>
        <p className="font-serif text-brown-mid text-base mb-1">&amp;</p>
        <p className="font-serif text-xl text-brown uppercase tracking-wide mb-0">Norzalelawati binti Sakiban</p>



        <p className="font-serif text-sm text-brown-mid leading-relaxed mt-4 mb-6">
          Dengan penuh rasa kesyukuran, kami ingin menjemput Dato | Datin | Tuan | Puan | Encik | Cik
          ke majlis perkahwinan puteri kami yang dikasihi
        </p>

        <div className="my-5">
          <p className="font-script text-5xl text-brown leading-tight">{bride.name}</p>
          <p className="font-sans text-[10px] tracking-widest uppercase text-pink mt-1">
            {bride.fullName}
          </p>
        </div>

        <p className="font-serif text-lg text-matcha italic">dengan pilihan hatinya</p>

        <div className="my-5">
          <p className="font-script text-5xl text-brown leading-tight">{groom.name}</p>
          <p className="font-sans text-[10px] tracking-widest uppercase text-pink mt-1">
            {groom.fullName}
          </p>
        </div>



        <p className="font-serif italic text-black-mid text-sm mt-4 leading-relaxed">
          Semoga dengan kehadiran Tuan/Puan dapat menyerikan lagi majlis kami.
        </p>
      </div>

    </section>
  )
}
