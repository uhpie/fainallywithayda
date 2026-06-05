import { useEffect } from 'react'
import useInView from '../hooks/useInView'
import { config } from '../config'
import CoverBackground from './CoverBackground'

export default function Opening() {
  const [ref, visible] = useInView()
  const { groom, bride, reception } = config

  const date = new Date(reception.date)
  const day = date.getDate()
  const month = date.toLocaleDateString('ms-MY', { month: 'long' })
  const year = date.getFullYear()

  // Auto-scroll slow motion
  useEffect(() => {
    const container = document.getElementById('scroll-container')
    if (!container) return

    let animationId
    let lastTime = performance.now()
    let isPaused = false
    let resumeTimeout

    const scrollDown = (time) => {
      if (isPaused) {
        lastTime = time
        animationId = requestAnimationFrame(scrollDown)
        return
      }

      const delta = time - lastTime
      lastTime = time
      
      // Berhenti scroll kalau dah sampai bawah
      if (container.scrollTop + container.clientHeight < container.scrollHeight - 1) {
        container.scrollTop += 15 * (delta / 1000)
      }
      animationId = requestAnimationFrame(scrollDown)
    }

    const t = setTimeout(() => {
      lastTime = performance.now()
      animationId = requestAnimationFrame(scrollDown)
    }, 2000) // Mula auto-scroll lepas 2 saat

    // Pause scroll bila user sentuh, dan set timer 3 saat untuk sambung
    const handleInteraction = () => {
      isPaused = true
      clearTimeout(resumeTimeout)
      resumeTimeout = setTimeout(() => {
        isPaused = false
        lastTime = performance.now()
      }, 3000)
    }

    container.addEventListener('touchstart', handleInteraction, { passive: true })
    container.addEventListener('touchmove', handleInteraction, { passive: true })
    container.addEventListener('wheel', handleInteraction, { passive: true })
    container.addEventListener('mousedown', handleInteraction, { passive: true })

    return () => {
      clearTimeout(t)
      clearTimeout(resumeTimeout)
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
          <p className="font-sans text-[20px] tracking-[0.05em] text-pink mt-1 uppercase font-bold">
            {day} {month} {year}
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
          Dengan penuh rasa syukur ke hadrat Allah SWT serta senantiasa berselawat ke atas
          junjungan besar Nabi Muhammad SAW, kami dengan segala kerendahan hati memohon
          kehadiran Tuan/Puan/Saudara/Saudari ke majlis perkahwinan puteri kami:
        </p>

        <div className="my-5">
          <p className="font-script text-5xl text-brown leading-tight">{bride.name}</p>
          <p className="font-sans text-[10px] tracking-widest uppercase text-pink mt-1">
            {bride.fullName}
          </p>
        </div>

        <p className="font-serif text-lg text-matcha italic">bersama</p>

        <div className="my-5">
          <p className="font-script text-5xl text-brown leading-tight">{groom.name}</p>
          <p className="font-sans text-[10px] tracking-widest uppercase text-pink mt-1">
            {groom.fullName}
          </p>
        </div>



        <p className="font-serif italic text-black-mid text-sm mt-4 leading-relaxed">
          Semoga kehadiran Tuan/Puan dapat menyeri dan memeriahkan majlis bahagia kami.
          Kehadiran anda adalah hadiah yang amat berharga.
        </p>
      </div>

    </section>
  )
}
