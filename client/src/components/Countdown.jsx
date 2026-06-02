import { useState, useEffect } from 'react'
import useInView from '../hooks/useInView'
import { config } from '../config'
import { FloralDivider } from './FloralDecor'

function pad(n) { return String(n).padStart(2, '0') }

function getLeft(dateStr) {
  const diff = new Date(dateStr + 'T00:00:00') - new Date()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  }
}

function Unit({ value, label, accent }) {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`relative w-[62px] h-[62px] flex items-center justify-center border ${accent === 'pink' ? 'border-pink-light bg-pink-pale/60' : 'border-matcha-light bg-matcha-pale/60'}`}>
        <span className="font-serif text-2xl text-brown font-light">{pad(value)}</span>
        <span className="absolute top-1 left-1 w-1 h-1 rounded-full bg-pink/30" />
        <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-pink/30" />
        <span className="absolute bottom-1 left-1 w-1 h-1 rounded-full bg-matcha/30" />
        <span className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-matcha/30" />
      </div>
      <p className="font-sans text-[9px] tracking-[0.18em] uppercase text-brown-mid/60">{label}</p>
    </div>
  )
}

export default function Countdown() {
  const [ref, visible] = useInView()
  const [left, setLeft] = useState(getLeft(config.reception.date))

  useEffect(() => {
    const id = setInterval(() => setLeft(getLeft(config.reception.date)), 1000)
    return () => clearInterval(id)
  }, [])

  const { groom, bride, reception } = config
  const date = new Date(reception.date)

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''} bg-cream`}>
      <div className="section-inner text-center">
        <p className="section-eyebrow">Kiraan Hari</p>
        <h2 className="section-title">Menghitung Hari</h2>
        <FloralDivider />

        <div className="mt-6 mb-8">
          <p className="font-script text-4xl text-brown leading-tight">
            {bride.name} &amp; {groom.name}
          </p>
          <p className="font-sans text-[10px] tracking-[0.2em] text-matcha-deep uppercase mt-1">
            {date.getDate()}{' '}
            {date.toLocaleDateString('ms-MY', { month: 'long' }).toUpperCase()}{' '}
            {date.getFullYear()} · {reception.dayName}
          </p>
        </div>

        {left ? (
          <div className="flex items-start justify-center gap-2.5">
            <Unit value={left.days} label="Hari" accent="pink" />
            <span className="font-serif text-xl text-pink/50 mt-3">:</span>
            <Unit value={left.hours} label="Jam" accent="matcha" />
            <span className="font-serif text-xl text-pink/50 mt-3">:</span>
            <Unit value={left.minutes} label="Minit" accent="pink" />
            <span className="font-serif text-xl text-pink/50 mt-3">:</span>
            <Unit value={left.seconds} label="Saat" accent="matcha" />
          </div>
        ) : (
          <div className="py-6">
            <p className="font-script text-4xl text-pink">Hari Bahagia Telah Tiba!</p>
            <p className="font-serif italic text-brown-mid/60 text-sm mt-2">
              Alhamdulillah, selamat pengantin baru 🌸
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
