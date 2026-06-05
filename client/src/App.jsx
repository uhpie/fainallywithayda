import { useState, useRef, useEffect } from 'react'
import Cover from './components/Cover'
import Opening from './components/Opening'
import Event from './components/Event'
import Countdown from './components/Countdown'
import RSVP from './components/RSVP'
import Wishes from './components/Wishes'
import Gallery from './components/Gallery'
import Location from './components/Location'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { config } from './config'

// ── Icons ─────────────────────────────────────────────────────────────────────

function IcHome() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5L12 3L21 10.5V20.5C21 21.05 20.55 21.5 20 21.5H15.5V15.5H8.5V21.5H4C3.45 21.5 3 21.05 3 20.5V10.5Z" />
    </svg>
  )
}

function IcCalendar() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M3 9H21M8 2V6M16 2V6" />
    </svg>
  )
}

function IcEnvelope() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="5" width="20" height="15" rx="2" />
      <path d="M2 6L12 13.5L22 6" />
    </svg>
  )
}

function IcCamera() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4L9 3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  )
}

function IcMap() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  )
}

function IcPhone() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}

const TABS = [
  { id: 'home',     label: 'Utama',    Icon: IcHome },
  { id: 'event',    label: 'Aturcara', Icon: IcCalendar },
  { id: 'rsvp',     label: 'RSVP',     Icon: IcEnvelope },
  { id: 'gallery',  label: 'Galeri',   Icon: IcCamera },
  { id: 'location', label: 'Lokasi',   Icon: IcMap },
  { id: 'contact',  label: 'Hubungi',  Icon: IcPhone },
]

// ── Bottom Nav ────────────────────────────────────────────────────────────────

function BottomNav({ active, onChange }) {
  return (
    <nav className="relative z-10 flex-shrink-0 border-t border-pink-light/50 bg-cream/95 backdrop-blur-sm flex overflow-x-auto no-scrollbar safe-bottom">
      {TABS.map(({ id, label, Icon }) => {
        const on = active === id
        return (
          <button
            key={id}
            onClick={() => onChange(id)}
            className={`relative flex-1 min-w-[60px] flex flex-col items-center pt-2.5 pb-3 gap-1 transition-colors duration-200 ${
              on ? 'text-pink' : 'text-brown-mid/35 hover:text-brown-mid/55'
            }`}
          >
            {/* active top line */}
            {on && (
              <span className="absolute top-0 left-3 right-3 h-[2px] bg-pink rounded-full" />
            )}
            <Icon />
            <span className={`font-sans text-[8px] tracking-wide leading-none ${on ? 'font-semibold' : ''}`}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

// ── Tab content ───────────────────────────────────────────────────────────────

function TabContent({ tab }) {
  switch (tab) {
    case 'home':     return <><Opening /><Footer /></>
    case 'event':    return <><Event /><Countdown /></>
    case 'rsvp':     return <><RSVP /></>
    case 'gallery':  return <Gallery />
    case 'location': return <Location />
    case 'contact':  return <Contact />
    default:         return null
  }
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [opened, setOpened] = useState(false)
  const [tab, setTab] = useState('home')
  const contentRef = useRef(null)

  // scroll to top on tab change
  useEffect(() => {
    contentRef.current?.scrollTo({ top: 0 })
  }, [tab])

  return (
    <div
      className="flex justify-center"
      style={{
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: config.background.desktopColor,
      }}
    >
      <div
        className={`w-full max-w-phone shadow-phone flex flex-col relative${config.background.image ? ' has-bg' : ''}`}
        style={{
          height: '100dvh',
          overflowY: opened ? 'hidden' : 'auto',
          backgroundColor: config.background.pageColor,
          ...(config.background.image && {
            backgroundImage: `url(${config.background.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }),
        }}
      >
        {!opened ? (
          /* Cover fills full height — overlay khas Cover diurus oleh CoverBackground */
          <Cover onOpen={() => { setOpened(true); setTab('home') }} />
        ) : (
          <>
            {/* Overlay — multiply blend: kawasan putih hilang, bunga kelihatan di tepi */}
            {config.background.overlay && (
              <img
                src={config.background.overlay}
                alt=""
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'fill', pointerEvents: 'none', zIndex: 5, mixBlendMode: 'multiply' }}
              />
            )}

            {/* Scrollable content */}
            <div
              ref={contentRef}
              key={tab}
              className="flex-1 overflow-y-auto min-h-0"
              style={{ animation: 'tabFadeIn 0.3s ease-out' }}
            >
              <TabContent tab={tab} />
            </div>

            {/* Fixed bottom nav */}
            <BottomNav active={tab} onChange={setTab} />
          </>
        )}
      </div>
    </div>
  )
}
