import useInView from '../hooks/useInView'
import { config } from '../config'

export default function Location() {
  const [ref, visible] = useInView()
  const { location, reception } = config

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''} bg-cream-pink`}>
      <div className="section-inner">
        <div className="text-center">
          <p className="section-eyebrow">Lokasi</p>
          <h2 className="section-title">Tempat Majlis</h2>
          
        </div>

        <div className="text-center mt-4 mb-6">
          <p className="font-script text-3xl text-black mb-1">{reception.venue}</p>
          <p className="font-serif text-sm text-black-mid/60">{location.address}</p>
        </div>

        {/* Map */}
        <div className="border border-pink-light/60 overflow-hidden aspect-[4/3] mb-4">
          <iframe
            src={location.googleMapsEmbed}
            width="100%" height="100%"
            style={{ border: 0 }}
            allowFullScreen loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Majlis"
          />
        </div>

        {/* Navigation */}
        <div className="flex flex-col gap-2.5">
          <a href={location.wazeUrl} target="_blank" rel="noopener noreferrer" className="btn-pink-fill">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.54 6.63C18.95 3.23 15.9 1 12.5 1 7.25 1 3 5.25 3 10.5c0 2.48 1.05 4.85 2.89 6.53.5.46.78 1.1.78 1.78v.5c0 .55.45 1 1 1h9.66c.55 0 1-.45 1-1v-.5c0-.68.28-1.32.78-1.78C21.97 15.46 23 13.09 23 10.5c0-1.38-.16-2.74-.46-3.87z" />
            </svg>
            Buka Waze
          </a>
          <a href={location.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="btn-matcha">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z" />
            </svg>
            Google Maps
          </a>
        </div>
      </div>
    </section>
  )
}
