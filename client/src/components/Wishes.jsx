import { useState, useEffect } from 'react'
import useInView from '../hooks/useInView'
import { FloralDivider } from './FloralDecor'

const INIT = { name: '', message: '' }

export default function Wishes() {
  const [ref, visible] = useInView()
  const [wishes, setWishes] = useState([])
  const [form, setForm] = useState(INIT)
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    fetch('/api/wishes').then((r) => r.json()).then(setWishes).catch(() => { })
  }, [])

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      const { data } = await res.json()
      setWishes((w) => [data, ...w])
      setForm(INIT)
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2500)
    } catch {
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  const avatarColors = ['bg-pink-pale border-pink-light', 'bg-matcha-pale border-matcha-light', 'bg-pink-pale border-pink-light']

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''} bg-cream`}>
      <div className="section-inner">
        <div className="text-center">
          <p className="section-eyebrow">Buku Tetamu</p>
          <h2 className="section-title">Ucapan &amp; Doa</h2>
          <FloralDivider />
          <p className="font-serif italic text-black-mid/60 text-xs mb-6">
            Tinggalkan ucapan dan doa untuk pengantin
          </p>
        </div>

        {/* Submit form */}
        <div className="border border-pink-light/50 bg-cream-pink p-5 mb-6">
          <form onSubmit={submit} className="space-y-3">
            <input
              type="text" value={form.name} onChange={set('name')}
              placeholder="Nama anda *" required className="form-input"
            />
            <textarea
              value={form.message} onChange={set('message')}
              placeholder="Ucapan atau doa untuk pengantin... *"
              rows={3} required className="form-input resize-none"
            />
            {status === 'success' && (
              <p className="font-sans text-[10px] text-matcha-deep tracking-wider">
                ✓ Ucapan anda telah dihantar!
              </p>
            )}
            {status === 'error' && (
              <p className="font-sans text-[10px] text-pink-deep tracking-wider">
                Maaf, sila cuba lagi.
              </p>
            )}
            <button type="submit" disabled={status === 'loading'} className="w-full btn-pink-fill disabled:opacity-50">
              {status === 'loading' ? 'Menghantar...' : 'Hantar Ucapan'}
            </button>
          </form>
        </div>

        {/* Wishes list */}
        {wishes.length > 0 ? (
          <div className="space-y-3 max-h-[440px] overflow-y-auto pr-0.5">
            {wishes.map((w, i) => (
              <div key={w.id} className={`border p-4 ${avatarColors[i % avatarColors.length]}`}>
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full border flex items-center justify-center flex-shrink-0 ${avatarColors[i % avatarColors.length]}`}>
                    <span className="font-serif text-sm text-brown font-medium">
                      {w.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-baseline gap-2 mb-0.5">
                      <p className="font-sans text-[11px] font-medium text-brown tracking-wide">{w.name}</p>
                      <p className="font-sans text-[9px] text-brown-mid/40">
                        {new Date(w.createdAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <p className="font-serif text-sm text-brown-mid leading-relaxed">{w.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center font-serif italic text-black-mid/40 text-sm py-6">
            Belum ada ucapan. Jadilah yang pertama!
          </p>
        )}
      </div>
    </section>
  )
}
