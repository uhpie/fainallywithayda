import useInView from '../hooks/useInView'
import { config } from '../config'
import { FloralTop, FloralBottom, FloralDivider } from './FloralDecor'

export default function Opening() {
  const [ref, visible] = useInView()
  const { groom, bride, reception } = config

  const date = new Date(reception.date)
  const day = date.getDate()
  const month = date.toLocaleDateString('ms-MY', { month: 'long' })
  const year = date.getFullYear()

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''}`}>

      {/* ── Cover hero (sama macam Cover.jsx tapi tanpa butang) ── */}
      <div className="bg-cream text-center">
        <FloralTop />

        <div className="px-8 pb-10" style={{ marginTop: '10px' }}>
          <p className="arabic text-3xl text-matcha leading-loose mb-5">
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </p>

          <p className="font-sans text-[9px] tracking-[0.36em] uppercase text-pink mb-4">
            Walimatul Urus
          </p>

          <div className="flex items-center gap-3 mb-5 mx-auto max-w-[200px]">
            <div className="flex-1 h-px bg-pink/30" />
            <svg className="w-2.5 h-2.5 text-pink/50 rotate-45" viewBox="0 0 10 10" fill="currentColor">
              <rect width="10" height="10" />
            </svg>
            <div className="flex-1 h-px bg-pink/30" />
          </div>

          <h1 className="font-script text-[62px] leading-none text-brown">{bride.name}</h1>
          <p className="font-serif text-2xl text-matcha italic my-2">&amp;</p>
          <h1 className="font-script text-[62px] leading-none text-brown mb-5">{groom.name}</h1>

          <div className="flex items-center gap-3 mb-5 mx-auto max-w-[200px]">
            <div className="flex-1 h-px bg-pink/30" />
            <svg className="w-2.5 h-2.5 text-matcha/50" viewBox="0 0 10 10" fill="currentColor">
              <circle cx="5" cy="5" r="4" />
            </svg>
            <div className="flex-1 h-px bg-pink/30" />
          </div>

          <p className="font-serif italic text-brown-mid text-2xl">{reception.dayName}</p>
          <p className="font-sans text-[20px] tracking-[0.05em] text-matcha-deep uppercase mt-1">
            {day} {month} {year}
          </p>
        </div>

        <FloralBottom />
      </div>

      {/* ── Teks jemputan ── */}
      <div className="section-inner text-center bg-cream-pink">
        <p className="font-serif italic text-black-mid text-sm mb-6">
          Assalamualaikum dan Selamat Sejahtera.<br />
          Dengan nama Allah yang Maha Pengasih lagi Maha Penyayang.
        </p>

        <p className="font-serif text-xl text-brown uppercase tracking-wide mb-1">Jasni bin Mahmood</p>
        <p className="font-serif text-brown-mid text-base mb-1">&amp;</p>
        <p className="font-serif text-xl text-brown uppercase tracking-wide mb-0">Norzalelawati binti Sakiban</p>

        <FloralDivider />

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

        <FloralDivider />

        <p className="font-serif italic text-black-mid/60 text-sm mt-4 leading-relaxed">
          Semoga kehadiran Tuan/Puan dapat menyeri dan memeriahkan majlis bahagia kami.
          Kehadiran anda adalah hadiah yang amat berharga.
        </p>
      </div>

    </section>
  )
}
