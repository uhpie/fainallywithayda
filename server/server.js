const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
require('dotenv').config({ path: path.join(__dirname, '..', '.env') })

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:4173',
    process.env.CLIENT_URL,
  ].filter(Boolean),
}))
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

// ── Data helpers ─────────────────────────────────────────────────────────────
const DATA_DIR = path.join(__dirname, 'data')
const RSVP_FILE = path.join(DATA_DIR, 'rsvp.json')
const WISHES_FILE = path.join(DATA_DIR, 'wishes.json')

if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
if (!fs.existsSync(RSVP_FILE)) fs.writeFileSync(RSVP_FILE, '[]')
if (!fs.existsSync(WISHES_FILE)) fs.writeFileSync(WISHES_FILE, '[]')

const readJSON = (file) => JSON.parse(fs.readFileSync(file, 'utf8'))
const writeJSON = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2))

// ── Google Drive ──────────────────────────────────────────────────────────────
let driveClient = null

function getDrive() {
  if (driveClient) return driveClient

  const key = process.env.GOOGLE_SERVICE_ACCOUNT_KEY
  if (!key) {
    console.warn('[Drive] GOOGLE_SERVICE_ACCOUNT_KEY tidak ditetapkan — galeri upload dilumpuhkan')
    return null
  }

  try {
    const { google } = require('googleapis')
    const credentials = JSON.parse(key)
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    })
    driveClient = google.drive({ version: 'v3', auth })
    return driveClient
  } catch (err) {
    console.error('[Drive] Gagal memulakan:', err.message)
    return null
  }
}

// ── RSVP routes ───────────────────────────────────────────────────────────────
app.get('/api/rsvp', (_req, res) => {
  res.json(readJSON(RSVP_FILE))
})

app.post('/api/rsvp', (req, res) => {
  const { name, phone, pax, attendance, message } = req.body

  if (!name?.trim() || !attendance) {
    return res.status(400).json({ error: 'Nama dan kehadiran diperlukan' })
  }

  const rsvps = readJSON(RSVP_FILE)
  const entry = {
    id: uuidv4(),
    name: name.trim(),
    phone: phone?.trim() || '',
    pax: Math.max(1, parseInt(pax) || 1),
    attendance,
    message: message?.trim() || '',
    createdAt: new Date().toISOString(),
  }

  rsvps.push(entry)
  writeJSON(RSVP_FILE, rsvps)
  res.json({ success: true, data: entry })
})

// ── Wishes routes ─────────────────────────────────────────────────────────────
app.get('/api/wishes', (_req, res) => {
  res.json(readJSON(WISHES_FILE))
})

app.post('/api/wishes', (req, res) => {
  const { name, message } = req.body

  if (!name?.trim() || !message?.trim()) {
    return res.status(400).json({ error: 'Nama dan ucapan diperlukan' })
  }

  const wishes = readJSON(WISHES_FILE)
  const entry = {
    id: uuidv4(),
    name: name.trim(),
    message: message.trim(),
    createdAt: new Date().toISOString(),
  }

  wishes.unshift(entry)
  writeJSON(WISHES_FILE, wishes)
  res.json({ success: true, data: entry })
})

// ── Gallery routes ────────────────────────────────────────────────────────────
app.get('/api/gallery', async (_req, res) => {
  const drive = getDrive()
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID

  if (!drive || !folderId) {
    return res.json({ photos: [], configured: false })
  }

  try {
    const response = await drive.files.list({
      q: `'${folderId}' in parents and mimeType contains 'image/' and trashed=false`,
      fields: 'files(id,name,thumbnailLink,createdTime)',
      orderBy: 'createdTime desc',
      pageSize: 60,
    })

    const photos = response.data.files.map((f) => ({
      id: f.id,
      name: f.name,
      thumbnail: `https://drive.google.com/thumbnail?id=${f.id}&sz=w400`,
      url: `https://drive.google.com/uc?export=view&id=${f.id}`,
      createdAt: f.createdTime,
    }))

    res.json({ photos, configured: true })
  } catch (err) {
    console.error('[Drive] List error:', err.message)
    res.status(500).json({ error: 'Gagal memuatkan galeri' })
  }
})

app.post('/api/gallery/upload', upload.single('photo'), async (req, res) => {
  const drive = getDrive()
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID

  if (!drive || !folderId) {
    return res.status(503).json({ error: 'Galeri upload tidak dikonfigurasi' })
  }

  if (!req.file) {
    return res.status(400).json({ error: 'Tiada fail yang dimuat naik' })
  }

  try {
    const { Readable } = require('stream')
    const stream = Readable.from(req.file.buffer)

    const uploaderName = (req.body.uploaderName || 'Tetamu').replace(/[^a-zA-Z0-9 _-]/g, '')
    const timestamp = new Date().toISOString().slice(0, 19).replace(/[:.]/g, '-')
    const ext = path.extname(req.file.originalname) || '.jpg'
    const fileName = `${uploaderName}_${timestamp}${ext}`

    const created = await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
        mimeType: req.file.mimetype,
      },
      media: {
        mimeType: req.file.mimetype,
        body: stream,
      },
      fields: 'id,name',
    })

    const fileId = created.data.id

    // Make publicly readable
    await drive.permissions.create({
      fileId,
      requestBody: { role: 'reader', type: 'anyone' },
    })

    res.json({
      success: true,
      photo: {
        id: fileId,
        name: created.data.name,
        thumbnail: `https://drive.google.com/thumbnail?id=${fileId}&sz=w400`,
        url: `https://drive.google.com/uc?export=view&id=${fileId}`,
        createdAt: new Date().toISOString(),
      },
    })
  } catch (err) {
    console.error('[Drive] Upload error:', err.message)
    res.status(500).json({ error: 'Muat naik gagal' })
  }
})

// ── Production static files ───────────────────────────────────────────────────
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '..', 'client', 'dist')
  app.use(express.static(buildPath))
  app.get('*', (_req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`✓ Server berjalan di http://localhost:${PORT}`)
})
