// =====================================================
// TUKAR MAKLUMAT PERKAHWINAN DI SINI
// Edit wedding details here
// =====================================================

export const config = {
  // ── Background (keseluruhan app) ───────────────────────────────────────────
  // pageColor    : warna background phone frame
  // desktopColor : warna latar belakang desktop (di sekeliling phone)
  // image        : letak 'bg.jpg' untuk background gambar, null untuk tiada
  // overlay      : letak 'overlay.png' untuk overlay PNG, null untuk tiada
  background: {
    pageColor: '#FFF9F2',
    desktopColor: '#EEF5E8',
    image: null,
    overlay: 'overlay.png',
  },
  // ───────────────────────────────────────────────────────────────────────────

  // ── Cover Background (skrin pertama sahaja) ─────────────────────────────────
  // image        : nama fail gambar dalam folder /public, contoh: 'cover-bg.jpg'
  //                Letak null untuk pakai warna gradient default (tiada gambar)
  // imageOpacity : kelegapan gambar (0.0 = telus, 1.0 = penuh). Default: 1.0
  // gradientFrom : warna gradient atas (dipakai jika image: null)
  // gradientTo   : warna gradient bawah (dipakai jika image: null)
  // overlay      : warna overlay warna di atas gambar, format: 'rgba(r,g,b,opacity)'
  //                Letak null jika tidak mahu overlay warna
  // overlayImage : nama fail PNG overlay khas untuk Cover, contoh: 'overlay.png'
  //                Letak null jika tidak mahu overlay gambar
  cover: {
    image: 'bg.jpg',             // ← gambar latar Cover (null = pakai gradient)
    imageOpacity: 0.85,
    gradientFrom: '#FFF9F2',
    gradientTo: '#F5EAD7',
    overlay: null, // ← overlay warna (null = tiada)
    overlayImage: null, // ← overlay PNG khas Cover (null = tiada)
  },
  // ───────────────────────────────────────────────────────────────────────────

  groom: {
    name: 'Faizul',
    fullName: 'Faizul Humam bin Mukminin',
    father: 'Mukminin bin Sumani',
  },
  bride: {
    name: 'Ayda',
    fullName: 'Nooraida Izzati binti Jasni',
    father: 'Jasni bin Mahmood',
  },

  reception: {
    title: 'Majlis Akad Nikah',
    subtitle: 'Akad Nikah',
    date: '2026-06-26', // Contoh tarikh nikah (Jumaat, sehari sebelum majlis)
    dayName: 'Jumaat',
    time: '8:00 Pagi',
    venue: 'Masjid Jamek Sultan Ibrahim',
    address: 'Jalan Pejabat, 83000 Batu Pahat, Johor',
    schedule: [
      { time: '8:00 Pagi', label: 'Ketibaan Tetamu & Keluarga' },
      { time: '9:00 Pagi', label: 'Majlis Akad Nikah Bermula' },
      { time: '10:30 Pagi', label: 'Sesi Bergambar' },
      { time: '11:00 Pagi', label: 'Jamuan Ringan & Bersurai' },
    ]
  },
  // Nama ibu bapa (jika mahu digunakan di tempat lain)
  brideParents: {
    father: 'Jasni bin Mahmood',
    mother: 'Norzalelawati binti Sakiban',
  },
  groomParents: {
    father: 'Mukminin bin Sumani',
    mother: 'Nama Ibu Pengantin Lelaki',
  },

  // Senarai nombor telefon untuk dipaparkan di bahagian Hubungi Kami (Contact.jsx)
  contacts: [
    { role: 'Ayah', name: 'Jasni', phone: '+60106639963' },
    { role: 'Abang', name: 'Halim', phone: '+60169101077' },
    { role: 'Abang', name: 'Hanafi', phone: '+60193469253' },
    { role: 'Kakak', name: 'Lynn', phone: '+60137115416' },
  ],
  location: {
    // Tukar URL ini kepada lokasi sebenar
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.751653457471!2d102.92007029999999!3d1.8442299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d057002573bc51%3A0x751619ee6323c53d!2ssentosa%20villabp!5e0!3m2!1sen!2smy!4v1780440838145!5m2!1sen!2smy" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    googleMapsUrl: 'https://maps.app.goo.gl/uSm1B4YMZyfx1EyA7?g_st=ic',
    wazeUrl: 'https://ul.waze.com/ul?place=ChIJUbxzJQBX0DERPcUjY-4ZFnU&ll=1.84422990%2C102.92007030&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location',
    address: 'Lot 1657, Kampung Muhibbah, Peserai, 83000 Batu Pahat, Johor',
  },
}
