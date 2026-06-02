import useInView from '../hooks/useInView'
import { config } from '../config'
import { FloralDivider, FloralCorner } from './FloralDecor'

function ContactCard({ person, label, relation = 'Putera' }) {
  return (
    <div className="flex flex-col items-center text-center">
      {/* Avatar */}
      <div className="relative mb-4">
        <div className="w-28 h-28 rounded-full border-2 border-pink-light bg-pink-pale flex items-center justify-center overflow-hidden">
          <svg className="w-14 h-14 text-pink-light" viewBox="0 0 64 64" fill="currentColor">
            <circle cx="32" cy="22" r="11" />
            <path d="M8 56 C8 40 20 32 32 32 C44 32 56 40 56 56" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-full border border-pink/30 scale-110" />
        <div className="absolute inset-0 rounded-full border border-matcha-light/40 scale-125" />
      </div>

      <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-matcha mb-1">{label}</p>
      <p className="font-script text-4xl text-brown leading-tight mb-1">{person.name}</p>
      <p className="font-sans text-[10px] tracking-wider text-brown-mid/60 uppercase mb-2">
        {person.fullName}
      </p>
      <p className="font-serif italic text-brown-mid/70 text-xs mb-5">
        {relation} kepada<br />
        <span className="not-italic font-medium text-brown text-sm">{person.father}</span>

      </p>
    </div>
  )
}

export default function Couple() {
  const [ref, visible] = useInView()
  const { bride, groom } = config

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''} bg-cream relative overflow-hidden`}>
      {/* Corner florals */}
      <FloralCorner className="absolute top-0 left-0 opacity-40" />
      <FloralCorner className="absolute top-0 right-0 opacity-40 scale-x-[-1]" />

      <div className="section-inner text-center">
        <p className="section-eyebrow">Pengantin</p>
        <h2 className="section-title">Bakal Pengantin</h2>
        <FloralDivider />

        <div className="space-y-10 mt-6">
          <ContactCard person={bride} label="Pengantin Perempuan" relation="Puteri" />

          {/* Divider */}
          <div className="petal-divider">
            <p className="font-script text-3xl text-matcha italic px-2">bersama</p>
          </div>

          <ContactCard person={groom} label="Pengantin Lelaki" relation="Putera" />
        </div>
      </div>
    </section>
  )
}
