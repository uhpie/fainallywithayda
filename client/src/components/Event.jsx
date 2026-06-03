import useInView from '../hooks/useInView'
import { config } from '../config'

const SCHEDULE = [
  { time: '11:00 Pagi', label: 'Ketibaan Tetamu' },
  { time: '2:00 Petang', label: 'Ketibaan Pengantin' },
  { time: '4:00 Petang', label: 'Majlis Bersurai' },
]

// ── Real Google "G" logo ──────────────────────────────────────────────────────
function GoogleCalIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  )
}

// ── Real Apple logo ───────────────────────────────────────────────────────────
function AppleCalIcon() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  )
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function addToGoogle(event, title) {
  const d = event.date.replace(/-/g, '')
  const params = new URLSearchParams({
    action: 'TEMPLATE', text: title,
    dates: `${d}T110000/${d}T160000`,
    details: `${event.venue}\n${event.address}`,
    location: event.address,
  })
  window.open(`https://calendar.google.com/calendar/render?${params}`, '_blank')
}

function downloadICS(event, title) {
  const d = event.date.replace(/-/g, '')
  const ics = [
    'BEGIN:VCALENDAR', 'VERSION:2.0', 'BEGIN:VEVENT',
    `UID:${Date.now()}@wedding`, `DTSTART:${d}T110000`, `DTEND:${d}T160000`,
    `SUMMARY:${title}`, `LOCATION:${event.address}`, 'END:VEVENT', 'END:VCALENDAR',
  ].join('\r\n')
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([ics], { type: 'text/calendar' })),
    download: 'wedding.ics',
  })
  a.click()
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Event() {
  const [ref, visible] = useInView()
  const { reception, groom, bride } = config
  const date = new Date(reception.date)
  const fullTitle = `Walimatul Urus — ${groom.name} & ${bride.name}`

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''} bg-cream-pink`}>
      <div className="section-inner">
        <div className="text-center">
          <p className="section-eyebrow">Aturcara</p>
          <h2 className="section-title">Aturcara  Majlis</h2>
          
        </div>

        {/* Event card */}
        <div className="border border-pink/20 bg-cream overflow-hidden mt-6">
          <div className="h-1 bg-pink" />
          <div className="p-5">

            {/* Date + venue */}
            <div className="flex items-start gap-4 mb-5">
              <div className="flex-shrink-0 text-center border border-pink/20 bg-pink-pale/50 px-3 py-2.5 min-w-[58px]">
                <p className="font-serif text-2xl text-brown font-light leading-none">{date.getDate()}</p>
                <p className="font-sans text-[8px] tracking-widest uppercase text-pink mt-0.5">
                  {date.toLocaleDateString('ms-MY', { month: 'short' })}
                </p>
                <p className="font-sans text-[8px] text-brown-mid/50">{date.getFullYear()}</p>
              </div>
              <div>
                <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-pink mb-1">Majlis Resepsi</p>
                <h3 className="font-serif text-lg text-brown mb-0.5">Walimatul Urus</h3>
                {reception.hijri && (
                  <p className="arabic text-xs text-matcha/80 mb-0.5">{reception.hijri}</p>
                )}
                <p className="font-sans text-[10px] tracking-wider text-brown-mid/60 uppercase">{reception.dayName}</p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-start gap-2.5 mb-5">
              <svg className="w-3.5 h-3.5 text-matcha mt-0.5 flex-shrink-0" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.3">
                <circle cx="7" cy="6" r="2.5" />
                <path d="M7 1 C4.5 1 2.5 3 2.5 5.5 C2.5 8.5 7 13 7 13 C7 13 11.5 8.5 11.5 5.5 C11.5 3 9.5 1 7 1Z" />
              </svg>
              <div>
                <p className="font-serif text-sm text-brown">{reception.venue}</p>
                <p className="font-serif text-xs text-brown-mid/60">{reception.address}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="border-t border-pink/10 pt-4 mb-5">
              <p className="font-sans text-[9px] tracking-[0.28em] uppercase text-matcha-deep mb-3">Aturcara</p>
              <div className="space-y-0">
                {SCHEDULE.map((item, i) => (
                  <div key={i} className="flex items-stretch gap-3">
                    {/* Timeline line + dot */}
                    <div className="flex flex-col items-center w-4 flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full border-2 border-pink bg-cream flex-shrink-0 mt-1" />
                      {i < SCHEDULE.length - 1 && (
                        <div className="w-px flex-1 bg-pink/20 my-0.5" />
                      )}
                    </div>
                    {/* Content */}
                    <div className="pb-3">
                      <p className="font-sans text-[10px] text-pink tracking-wide">{item.time}</p>
                      <p className="font-serif text-sm text-brown">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => addToGoogle(reception, fullTitle)}
                className="flex-1 flex items-center justify-center gap-2 border border-matcha/40 text-matcha-deep font-sans text-[10px] tracking-wider uppercase py-2.5 hover:bg-matcha hover:text-cream transition-all duration-300"
              >
                <GoogleCalIcon />
                Google Calendar
              </button>
              <button
                onClick={() => downloadICS(reception, fullTitle)}
                className="flex-1 flex items-center justify-center gap-2 border border-pink/40 text-pink font-sans text-[15px] tracking-wider py-2.5 hover:bg-pink hover:text-cream transition-all duration-300"
              >
                <AppleCalIcon />
                iCal
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
