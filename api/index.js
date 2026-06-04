const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// File upload (memory storage — stream directly to Drive)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true)
    else cb(new Error('Hanya gambar dibenarkan'), false)
  },
})

// ── Apps Script Proxy ────────────────────────────────────────────────────────
app.get('/api/gallery', async (_req, res) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
  if (!scriptUrl) {
    return res.json({ photos: [], configured: false })
  }

  try {
    const response = await fetch(scriptUrl)
    const data = await response.json()
    res.json(data)
  } catch (err) {
    console.error('[Apps Script] List error:', err.message)
    res.status(500).json({ error: 'Gagal memuatkan galeri' })
  }
})

app.post('/api/gallery/upload', upload.single('photo'), async (req, res) => {
  const scriptUrl = process.env.GOOGLE_APPS_SCRIPT_URL
  if (!scriptUrl) {
    return res.status(503).json({ error: 'Galeri upload tidak dikonfigurasi' })
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Tiada fail yang dimuat naik' })
  }

  try {
    const uploaderName = (req.body.uploaderName || 'Tetamu').replace(/[^a-zA-Z0-9 _-]/g, '')
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')
    const ext = path.extname(req.file.originalname) || '.jpg'
    const fileName = `${uploaderName}_${timestamp}${ext}`

    const base64Str = req.file.buffer.toString('base64')

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fileName,
        mimeType: req.file.mimetype,
        fileBase64: base64Str
      })
    })

    const data = await response.json()
    if (!data.success) throw new Error(data.error)

    res.json(data)
  } catch (err) {
    console.error('[Apps Script] Upload error:', err.message)
    res.status(500).json({ error: 'Muat naik gagal' })
  }
})

// Vercel serverless function entrypoint
module.exports = app
