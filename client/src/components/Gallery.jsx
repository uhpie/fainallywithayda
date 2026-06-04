import { useState, useEffect, useRef } from 'react'
import useInView from '../hooks/useInView'
import { config } from '../config'

export default function Gallery() {
  const [ref, visible] = useInView()
  const [photos, setPhotos] = useState([])
  const [configured, setConfigured] = useState(true)
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState(null)
  const [modal, setModal] = useState(false)
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [mergedBlob, setMergedBlob] = useState(null)
  const [uploaderName, setUploaderName] = useState('')
  const [uploadStatus, setUploadStatus] = useState('idle')
  const [currentPreviewIdx, setCurrentPreviewIdx] = useState(0)
  const inputLibraryRef = useRef(null)
  const inputCameraRef = useRef(null)

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
    const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL
    if (!scriptUrl) {
      setConfigured(false); setLoading(false); return
    }
    fetch(scriptUrl)
      .then((r) => r.json())
      .then((d) => { setPhotos(d.photos || []); setConfigured(true) })
      .catch(() => { setConfigured(true) })
      .finally(() => setLoading(false))
  }, [isEventDay])

  useEffect(() => {
    if (photos.length <= 1) return
    const timer = setInterval(() => {
      setCurrentPreviewIdx(i => (i + 1) % photos.length)
    }, 1500)
    return () => clearInterval(timer)
  }, [photos])

  async function applyOverlay(f) {
    setModal(true); setUploadStatus('idle'); setPreview(null); setMergedBlob(null)
    const imgUrl = URL.createObjectURL(f)

    // Create images
    const photo = new Image()
    photo.src = imgUrl
    const overlay = new Image()
    overlay.src = '/photobooth-frame.png'

    await Promise.all([
      new Promise(r => photo.onload = r),
      new Promise(r => overlay.onload = r).catch(() => console.warn('No overlay found'))
    ])

    const canvas = document.createElement('canvas')
    // IG Story size
    canvas.width = 1080
    canvas.height = 1920
    const ctx = canvas.getContext('2d')

    // Fill background
    ctx.fillStyle = '#FFF5F8'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Draw photo (object-fit: cover)
    const scale = Math.max(canvas.width / photo.width, canvas.height / photo.height)
    const w = photo.width * scale
    const h = photo.height * scale
    const x = (canvas.width - w) / 2
    const y = (canvas.height - h) / 2
    ctx.drawImage(photo, x, y, w, h)

    // Draw overlay if loaded
    if (overlay.width > 0) {
      ctx.drawImage(overlay, 0, 0, canvas.width, canvas.height)
    }

    const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
    setPreview(dataUrl)

    canvas.toBlob((blob) => {
      // Need a File object with name
      const mergedFile = new File([blob], `photobooth_${Date.now()}.jpg`, { type: 'image/jpeg' })
      setMergedBlob(mergedFile)
    }, 'image/jpeg', 0.85)
  }

  function onFileChange(e) {
    const f = e.target.files?.[0]
    if (!f) return
    applyOverlay(f)
  }

  async function upload() {
    if (!mergedBlob) return
    setUploadStatus('loading')
    const scriptUrl = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL
    if (!scriptUrl) { setUploadStatus('error'); return }

    const uploader = uploaderName || 'Tetamu'
    const fileName = `${uploader}_${Date.now()}.jpg`

    const reader = new FileReader()
    reader.readAsDataURL(mergedBlob)
    reader.onload = async () => {
      try {
        const base64Str = reader.result.split(',')[1]
        const res = await fetch(scriptUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain;charset=utf-8' },
          body: JSON.stringify({
            fileName,
            mimeType: 'image/jpeg',
            fileBase64: base64Str
          })
        })
        const data = await res.json()
        if (!data.success) throw new Error()
        setPhotos((p) => [data.photo, ...p])
        setUploadStatus('success')
        setTimeout(() => closeModal(), 1600)
      } catch (err) {
        setUploadStatus('error')
      }
    }
    reader.onerror = () => setUploadStatus('error')
  }

  function closeModal() { setModal(false); setFile(null); setPreview(null); setMergedBlob(null); setUploaderName(''); setUploadStatus('idle') }

  async function shareToIG() {
    if (!mergedBlob) return
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Photobooth',
          files: [mergedBlob]
        })
      } else {
        alert('Maaf, fungsi share tidak disokong pada browser ini. Anda boleh save gambar ini secara manual.')
      }
    } catch (err) {
      console.error(err)
    }
  }

  const lbIdx = photos.findIndex((p) => p.id === lightbox?.id)

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''}`} style={{ position: 'relative', zIndex: 10 }}>
      <div className="section-inner">
        <div className="text-center mb-12">
          <p className="section-eyebrow">Kenangan</p>
          <h2 className="section-title">Galeri Foto</h2>
        </div>

        {/* ── LOCKED state — sebelum hari event ── */}
        {!isEventDay ? (
          <div className="text-center mt-4">
            <div className="border border-pink-pale bg-cream-pink p-8">
              {/* Lock icon */}
              <div className="w-16 h-16 rounded-full border border-pink-light bg-pink-pale flex items-center justify-center mx-auto mb-5">
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
              <div className="inline-flex items-center gap-2 border border-matcha-light bg-matcha-pale px-4 py-2 mb-5">
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
                  <div key={i} className="aspect-square bg-pink-pale border border-pink-pale flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-light" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <path d="M21 15 L16 10 L5 21" />
                    </svg>
                  </div>
                ))}
              </div>
              <p className="font-sans text-[9px] tracking-widest text-black-mid uppercase mt-3">
                Foto-foto akan dipaparkan di sini
              </p>
            </div>
          </div>

        ) : (
          /* ── UNLOCKED state — hari event dan selepasnya ── */
          <div className={photos.length === 0 ? "flex flex-col items-center justify-center min-h-[60vh]" : ""}>
            {(configured || true) && (
              <div className={`${photos.length === 0 ? 'w-full' : 'mb-8'} border-2 border-dashed border-pink-light bg-cream-pink/50 p-8 flex flex-col items-center justify-center text-center`}>
                <svg className="w-12 h-12 text-pink mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="17 8 12 3 7 8" strokeLinecap="round" strokeLinejoin="round" />
                  <line x1="12" y1="3" x2="12" y2="15" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <p className="font-serif text-lg text-black mb-1">Kongsi Kenangan Anda</p>
                <p className="font-sans text-xs text-black-mid mb-6 uppercase tracking-widest">Format: JPG, PNG</p>

                <div className="flex flex-col sm:flex-row gap-3 w-full max-w-[280px]">
                  <button onClick={() => inputCameraRef.current?.click()} className="btn-pink flex-1 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg>
                    Kamera
                  </button>
                  <button onClick={() => inputLibraryRef.current?.click()} className="btn-pink flex-1 flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
                    Galeri
                  </button>
                </div>

                <input ref={inputCameraRef} type="file" accept="image/*" capture="environment" onChange={onFileChange} className="hidden" />
                <input ref={inputLibraryRef} type="file" accept="image/*" onChange={onFileChange} className="hidden" />
              </div>
            )}

            {loading ? (
              <div className="flex justify-center py-12">
                <svg className="w-8 h-8 text-pink/40 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3 A9 9 0 0 1 21 12" strokeLinecap="round" />
                </svg>
              </div>
            ) : photos.length === 0 ? null : (
              <div className="flex justify-center">
                <div className="relative w-full max-w-[280px] aspect-square overflow-hidden bg-pink-pale border border-pink-light shadow-md group cursor-pointer" onClick={() => setLightbox(photos[currentPreviewIdx])}>
                  {photos.map((p, i) => (
                    <img
                      key={p.id}
                      src={p.thumbnail || p.url}
                      alt={`Gambar ${i + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === currentPreviewIdx ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                      loading="lazy"
                    />
                  ))}
                  <div className="absolute inset-0 bg-pink/0 group-hover:bg-pink/15 transition-colors duration-300 z-20" />
                </div>
              </div>
            )}
          </div>
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
          <div className="bg-cream border border-pink-light p-6 w-full max-w-[360px] max-h-[95vh] overflow-y-auto">
            <p className="font-serif text-lg text-black text-center mb-4">Photobooth Anda</p>

            {preview ? (
              <div className="mb-4 overflow-hidden bg-pink-pale border border-pink-light rounded shadow-sm relative" style={{ aspectRatio: '9/16' }}>
                <img src={preview} alt="Preview" className="w-full h-full object-contain bg-black/5" />
              </div>
            ) : (
              <div className="mb-4 overflow-hidden bg-pink-pale border border-pink-light rounded shadow-sm relative flex items-center justify-center" style={{ aspectRatio: '9/16' }}>
                <svg className="w-8 h-8 text-pink/40 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3 A9 9 0 0 1 21 12" strokeLinecap="round" />
                </svg>
              </div>
            )}

            <input type="text" value={uploaderName} onChange={(e) => setUploaderName(e.target.value)} placeholder="Nama anda" className="form-input mb-4" />

            {uploadStatus === 'success' && <p className="text-center font-serif text-sm text-matcha-deep mb-3">✓ Gambar berjaya dihantar ke galeri!</p>}
            {uploadStatus === 'error' && <p className="text-center font-serif text-sm text-pink-deep mb-3">Muat naik ke galeri gagal.</p>}

            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <button onClick={closeModal} disabled={uploadStatus === 'loading'} className="flex-1 border border-pink-light text-black-mid font-sans text-[10px] tracking-widest uppercase py-2.5 hover:bg-pink-pale transition-colors">Tutup</button>
                <button onClick={upload} disabled={uploadStatus === 'loading' || uploadStatus === 'success' || !preview} className="flex-1 btn-pink-fill disabled:opacity-50">
                  {uploadStatus === 'loading' ? 'Menghantar...' : (uploadStatus === 'success' ? 'Dihantar ✓' : 'Hantar ke Galeri')}
                </button>
              </div>

              <button onClick={shareToIG} disabled={!preview} className="w-full py-2.5 mt-2 flex items-center justify-center gap-2 border border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C] hover:text-white transition-colors font-sans text-[10px] tracking-widest uppercase disabled:opacity-50">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>
                Kongsi ke IG Story
              </button>
            </div>
            <p className="font-sans text-[9px] text-center text-black-mid/60 mt-3">*Klik "Hantar ke Galeri" untuk kongsi gambar anda ke dalam album simpanan pasangan pengantin.</p>
          </div>
        </div>
      )}
    </section>
  )
}
