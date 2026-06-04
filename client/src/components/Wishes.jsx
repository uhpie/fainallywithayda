import { useState } from 'react'
import useInView from '../hooks/useInView'
import { supabase } from '../supabase'

const INIT = { name: '', message: '' }

export default function Wishes() {
  const [ref, visible] = useInView()
  const [form, setForm] = useState(INIT)
  const [status, setStatus] = useState('idle')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.message.trim()) return
    setStatus('loading')
    try {
      const { error } = await supabase
        .from('wishes')
        .insert([
          {
            name: form.name.trim(),
            message: form.message.trim(),
          }
        ])
        
      if (error) throw error
      
      setForm(INIT)
      setStatus('success')
      setTimeout(() => setStatus('idle'), 2500)
      
      // Dispatch event to trigger refresh in Footer
      window.dispatchEvent(new Event('wish-added'))
    } catch (err) {
      console.error(err)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 3000)
    }
  }

  return (
    <section ref={ref} className={`reveal ${visible ? 'revealed' : ''}`} style={{ position: 'relative', zIndex: 10 }}>
      <div className="section-inner">
        <div className="text-center">
          <p className="section-eyebrow">Buku Tetamu</p>
          <h2 className="section-title">Ucapan &amp; Doa</h2>
          <p className="font-serif italic text-black-mid text-xs mb-6">
            Tinggalkan ucapan dan doa untuk pengantin
          </p>
        </div>

        <div className="border border-pink-light bg-cream-pink p-5">
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

      </div>
    </section>
  )
}
