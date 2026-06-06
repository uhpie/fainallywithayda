import { useState } from 'react'
import useInView from '../hooks/useInView'
import { supabase } from '../supabase'

const INIT = { name: '', phone: '', pax: '1', attendance: 'hadir', message: '' }

export default function RSVP() {
  const [ref, visible] = useInView()
  const [form, setForm] = useState(INIT)
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => {
    const val = e.target.value
    setForm((f) => ({
      ...f,
      [k]: val,
      // reset pax to 1 bila tukar balik hadir, atau ke 0 bila tidak hadir
      ...(k === 'attendance' && { pax: val === 'tidak' ? '0' : '1' }),
    }))
  }

  async function submit(e) {
    e.preventDefault()
    setStatus('loading')
    try {
      const { error: rsvpError } = await supabase
        .from('rsvp_nikah')
        .insert([
          {
            name: form.name.trim(),
            phone: form.phone.trim(),
            pax: parseInt(form.pax) || 1,
            attendance: form.attendance,
            message: form.message.trim(),
          }
        ])

      if (error) throw error

      // Jika ada ucapan, simpan juga ke jadual wishes supaya keluar di Home
      if (form.message.trim()) {
        await supabase
          .from('wishes')
          .insert([{ name: form.name.trim(), message: form.message.trim() }])

        // Trigger Footer untuk refresh senarai ucapan
        window.dispatchEvent(new Event('wish-added'))
      }

      setStatus('success')
      setForm(INIT)
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''}`} style={{ position: 'relative', zIndex: 10 }}>
      <div className="section-inner">
        <div className="text-center">
          <p className="section-eyebrow">Kehadiran</p>
          <h2 className="section-title">RSVP</h2>

          <p className="font-serif italic text-black-mid text-md mb-6">
            Sila maklumkan kehadiran anda
          </p>
        </div>

        {status === 'success' ? (
          <div className="text-center py-10 border border-pink-light bg-cream">
            {/* Flower check */}
            <div className="w-16 h-16 rounded-full border-2 border-pink-light bg-pink-pale flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-pink" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 13 L9 17 L19 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="font-script text-4xl text-brown mb-2">Terima Kasih!</p>
            <p className="font-serif text-sm text-brown-mid">
              Kehadiran anda telah direkodkan.
            </p>
            <button onClick={() => setStatus('idle')} className="btn-pink mt-6">
              Hantar Lagi
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="space-y-3.5">
            <div>
              <label className="block font-sans text-[9px] tracking-widest uppercase text-matcha-deep mb-1.5">Nama *</label>
              <input type="text" value={form.name} onChange={set('name')} placeholder="Nama penuh anda" required className="form-input" />
            </div>

            <div>
              <label className="block font-sans text-[9px] tracking-widest uppercase text-matcha-deep mb-1.5">No. Telefon</label>
              <input type="tel" value={form.phone} onChange={set('phone')} placeholder="01XXXXXXXXX" className="form-input" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-sans text-[9px] tracking-widest uppercase text-matcha-deep mb-1.5">Kehadiran *</label>
                <select value={form.attendance} onChange={set('attendance')} className="form-input">
                  <option value="hadir">Hadir</option>
                  <option value="tidak">Tidak Dapat Hadir</option>
                </select>
              </div>
              <div>
                <label className={`block font-sans text-[9px] tracking-widest uppercase mb-1.5 text-matcha-deep`}>
                  Bilangan
                </label>
                {form.attendance === 'tidak' ? (
                  <div className="form-input bg-cream-pink text-brown-mid cursor-not-allowed select-none">
                    —
                  </div>
                ) : (
                  <select value={form.pax} onChange={set('pax')} className="form-input">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
                      <option key={n} value={n}>{n} orang</option>
                    ))}
                  </select>
                )}
              </div>
            </div>

            <div>
              <label className="block font-sans text-[9px] tracking-widest uppercase text-matcha-deep mb-1.5">Ucapan (pilihan)</label>
              <textarea
                value={form.message} onChange={set('message')}
                placeholder="Tinggalkan ucapan untuk pengantin..."
                rows={3} className="form-input resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="font-sans text-[10px] text-pink-deep text-center">Maaf, sila cuba lagi.</p>
            )}

            <button type="submit" disabled={status === 'loading'} className="w-full btn-pink-fill mt-1 disabled:opacity-50">
              {status === 'loading' ? (
                <span className="flex items-center gap-2">
                  <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3 A9 9 0 0 1 21 12" strokeLinecap="round" />
                  </svg>
                  Menghantar...
                </span>
              ) : 'Hantar RSVP'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
