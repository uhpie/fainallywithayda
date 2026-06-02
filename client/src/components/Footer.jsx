import { config } from '../config'
import { FloralBottom } from './FloralDecor'

export default function Footer() {
  const { groom, bride, reception } = config
  const date = new Date(reception.date)

  return (
    <footer className="bg-cream-pink text-center">
      {/* Floral top */}
      <div style={{ transform: 'scaleY(-1)', marginBottom: '-8px' }}>
        <FloralBottom />
      </div>

      <div className="px-8 pb-14 pt-4">
        {/* Arabic closing */}
        <p className="arabic text-2xl text-matcha leading-loose mb-2">جَزَاكُمُ اللَّهُ خَيْرًا</p>
        <p className="font-serif italic text-black-mid/50 text-sm mb-8">Semoga Allah membalas kebaikan kalian</p>

        {/* Divider */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-14 bg-pink-light/60" />
          <svg className="w-3 h-3 text-pink/50 rotate-45" viewBox="0 0 10 10" fill="currentColor"><rect width="10" height="10" /></svg>
          <div className="h-px w-14 bg-pink-light/60" />
        </div>

        <p className="font-script text-4xl text-brown mb-1">
          {bride.name} &amp; {groom.name}
        </p>
        <p className="font-sans text-[15px] tracking-[0.2em] text-matcha-deep uppercase">
          {date.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div className="flex items-center justify-center gap-3 mt-6 mb-4">
          <div className="h-px w-14 bg-pink-light/60" />
          <svg className="w-2.5 h-2.5 text-matcha/50" viewBox="0 0 10 10" fill="currentColor"><circle cx="5" cy="5" r="4" /></svg>
          <div className="h-px w-14 bg-pink-light/60" />
        </div>

        <p className="font-sans text-[9px] tracking-widest text-black-mid/25 uppercase">
          Terima kasih
        </p>
      </div>
    </footer>
  )
}
