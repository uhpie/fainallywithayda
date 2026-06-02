import { useState, useEffect, useRef } from 'react'
import useInView from '../hooks/useInView'
import { FloralDivider } from './FloralDecor'
import { config } from '../config'

export default function Gallery() {
  const [ref, visible] = useInView()
  const [photos, setPhotos] = useState([])
  const [configured, setConfigured] = useState(false)
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)
  const [modal, setModal] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [uploaderName, setUploaderName] = useState('')
  const [uploadStatus, setUploadStatus] = useState('idle')
  const inputRef = useRef(null)

  // Check if event day has arrived (compare date only, ignore time)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const eventDate = new Date(config.reception.date)
  eventDate.setHours(0, 0, 0, 0)
  const isEventDay = today >= eventDate

  const eventDateStr = eventDate.toLocaleDateString('ms-MY', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  useEffect(() => {
    if (!isEventDay) { setLoading(false); return }
    fetch('/api/gallery')
      .then((r) => r.json())
      .then((d) => { setPhotos(d.photos || []); setConfigured(d.configured) })
      .catch(() => { })
      .finally(() => setLoading(false))
  }, [isEventDay])

  function onFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f); setPreview(URL.createObjectURL(f)); setModal(true); setUploadStatus('idle')
  }

  async function upload() {
    if (!file) return
    setUploadStatus('loading')
    const fd = new FormData()
    fd.append('photo', file)
    fd.append('uploaderName', uploaderName || 'Tetamu')
    try {
      const res = await fetch('/api/gallery/upload', { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      const { photo } = await res.json()
      setPhotos((p) => [photo, ...p])
      setUploadStatus('success')
      setTimeout(() => { setModal(false); setFile(null); setPreview(null); setUploaderName(''); setUploadStatus('idle') }, 1600)
    } catch { setUploadStatus('error') }
  }

  function closeModal() { setModal(false); setFile(null); setPreview(null); setUploaderName(''); setUploadStatus('idle') }

  const lbIdx = photos.findIndex((p) => p.id === lightbox?.id)

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''} bg-cream`}>
      <div className="section-inner">
        <div className="text-center">
          <p className="section-eyebrow">Kenangan</p>
          <h2 className="section-title">Galeri Foto</h2>
          <FloralDivider />
        </div>

        {/* ── LOCKED state — sebelum hari event ── */}
        {!isEventDay ? (
          <div className="text-center mt-4">
            <div className="border border-pink/20 bg-cream-pink p-8">
              {/* Lock icon */}
              <div className="w-16 h-16 rounded-full border border-pink/30 bg-pink-pale flex items-center justify-center mx-auto mb-5">
                <svg className="w-7 h-7 text-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                  <rect x="5" y="11" width="14" height="10" rx="2" />
                  <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                </svg>
              </div>

              <p className="font-script text-3xl text-black mb-3">Galeri Dikunci</p>

              <p className="font-serif text-sm text-black-mid leading-relaxed mb-4">
                Galeri akan dibuka pada hari majlis.<br />
                Upload dan kongsi kenangan indah anda bersama kami!
              </p>

              {/* Event date pill */}
              <div className="inline-flex items-center gap-2 border border-matcha/30 bg-matcha-pale/50 px-4 py-2 mb-5">
                <svg className="w-3.5 h-3.5 text-matcha" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
                  <rect x="2" y="3" width="12" height="11" rx="1.5" />
                  <path d="M2 7 L14 7 M5 1 L5 4 M11 1 L11 4" />
                </svg>
                <p className="font-sans text-[10px] tracking-wider text-matcha-deep uppercase">
                  {eventDateStr}
                </p>
              </div>

              {/* Placeholder photo grid */}
              <div className="grid grid-cols-3 gap-1 mt-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-pink-pale/60 border border-pink/10 flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink/20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15 L16 10 L5 21" />
                    </svg>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[9px] tracking-widest text-black-mid/30 uppercase mt-3">
                Foto-foto akan dipaparkan di sini
              </p>
            </div>
          </div>

        ) : (
          /* ── UNLOCKED state — hari event dan selepasnya ── */
          <>
            {configured && (
              <div className="text-center mb-5">
                <button onClick={() => inputRef.current?.click()} className="btn-pink">
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M8 10 L8 2 M4 5 L8 2 L12 5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M2 13 L14 13" strokeLinecap="round" />
                  </svg>
                  Muat Naik Gambar
                </button>
                <input ref={inputRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <svg className="w-8 h-8 text-pink/40 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3 A9 9 0 0 1 21 12" strokeLinecap="round" />
                </svg>
              </div>
            ) : !configured ? (
              <div className="text-center py-12 border border-pink-light/50 bg-pink-pale/30">
                <p className="font-serif text-base text-black mb-1">Galeri akan dikemas kini</p>
                <p className="font-serif italic text-black-mid/50 text-xs">Foto-foto akan dimuat naik selepas majlis</p>
              </div>
            ) : photos.length === 0 ? (
              <div className="text-center py-12 border border-pink-light/50 bg-pink-pale/30">
                <p className="font-serif text-base text-black mb-1">Belum ada gambar</p>
                <p className="font-serif italic text-black-mid/50 text-xs">Jadilah yang pertama berkongsi kenangan!</p>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {photos.map((p, i) => (
                  <button key={p.id} onClick={() => setLightbox(p)} className="relative aspect-square overflow-hidden bg-pink-pale group">
                    <img src={p.thumbnail || p.url} alt={`Gambar ${i + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
                    <div className="absolute inset-0 bg-pink/0 group-hover:bg-pink/15 transition-colors duration-300" />
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          {/* Close */}
          <button className="absolute top-4 right-4 text-cream/50 hover:text-cream" onClick={() => setLightbox(null)}>
            <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 6L18 18M18 6L6 18" strokeLinecap="round" /></svg>
          </button>

          {/* Prev — loop ke last bila kat first */}
          <button
            className="absolute left-3 text-cream/50 hover:text-cream"
            onClick={(e) => { e.stopPropagation(); setLightbox(photos[(lbIdx - 1 + photos.length) % photos.length]) }}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M15 6L9 12L15 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <img src={lightbox.url} alt="Foto" className="max-w-full max-h-[85vh] object-contain" onClick={(e) => e.stopPropagation()} />

          {/* Counter */}
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 font-sans text-[10px] tracking-widest text-cream/40">
            {lbIdx + 1} / {photos.length}
          </p>

          {/* Next — loop ke first bila kat last */}
          <button
            className="absolute right-3 text-cream/50 hover:text-cream"
            onClick={(e) => { e.stopPropagation(); setLightbox(photos[(lbIdx + 1) % photos.length]) }}
          >
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 6L15 12L9 18" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      )}

      {/* Upload modal */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-5">
          <div className="bg-cream border border-pink-light/60 p-6 w-full max-w-[360px]">
            <p className="font-serif text-lg text-black text-center mb-4">Muat Naik Gambar</p>
            {preview && <div className="aspect-video mb-4 overflow-hidden bg-pink-pale"><img src={preview} alt="Preview" className="w-full h-full object-cover" /></div>}
            <input type="text" value={uploaderName} onChange={(e) => setUploaderName(e.target.value)} placeholder="Nama anda" className="form-input mb-3" />
            {uploadStatus === 'success' && <p className="text-center font-serif text-sm text-matcha-deep mb-3">✓ Gambar berjaya dimuat naik!</p>}
            {uploadStatus === 'error' && <p className="text-center font-serif text-sm text-pink-deep mb-3">Gagal. Cuba lagi.</p>}
            <div className="flex gap-2">
              <button onClick={closeModal} disabled={uploadStatus === 'loading'} className="flex-1 border border-pink-light/60 text-black-mid font-sans text-[10px] tracking-widest uppercase py-2.5 hover:bg-pink-pale transition-colors">Batal</button>
              <button onClick={upload} disabled={uploadStatus === 'loading' || uploadStatus === 'success'} className="flex-1 btn-pink-fill disabled:opacity-50">
                {uploadStatus === 'loading' ? 'Menghantar...' : 'Hantar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
