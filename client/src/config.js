// =====================================================
// TUKAR MAKLUMAT PERKAHWINAN DI SINI
// Edit wedding details here
// =====================================================

export const config = {
  // ── Background ─────────────────────────────────────────────────────────────
  // pageColor    : warna background phone frame
  // desktopColor : warna latar belakang desktop (di sekeliling phone)
  // image        : letak '/bg.jpg' untuk background gambar, null untuk tiada
  // overlay      : letak '/overlay.png' untuk overlay PNG, null untuk tiada
  background: {
    pageColor: null,
    desktopColor: null,
    image: 'bg.jpg',
    overlay: 'overlay.png',
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
    date: '2026-06-27',
    dayName: 'Sabtu',
    time: '11:00 Pagi – 4:00 Petang',
    venue: 'Sentosa Villa Event Venue',
    address: 'Lot 1657, Kampung Muhibbah, Peserai, 83000 Batu Pahat, Johor',
  },
  // Ibu bapa pengantin perempuan
  brideParents: {
    father: { name: 'Jasni bin Mahmood', contact: '+601XXXXXXXX' },
    mother: { name: 'Norzalelawati binti Sakiban', contact: '+601XXXXXXXX' },
    brother: { name: 'Name', contact: '+60XXXXXXXXX' },
  },
  // Ibu bapa pengantin lelaki
  groomParents: {
    father: { name: 'Mukminin bin Sumani', contact: '+601XXXXXXXX' },
    mother: { name: 'Nama Ibu Pengantin Lelaki', contact: '+601XXXXXXXX' },
  },
  location: {
    // Tukar URL ini kepada lokasi sebenar
    googleMapsEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.751653457471!2d102.92007029999999!3d1.8442299!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31d057002573bc51%3A0x751619ee6323c53d!2ssentosa%20villabp!5e0!3m2!1sen!2smy!4v1780440838145!5m2!1sen!2smy" width="400" height="300" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
    googleMapsUrl: 'https://maps.app.goo.gl/uSm1B4YMZyfx1EyA7?g_st=ic',
    wazeUrl: 'https://ul.waze.com/ul?place=ChIJUbxzJQBX0DERPcUjY-4ZFnU&ll=1.84422990%2C102.92007030&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location',
    address: 'Lot 1657, Kampung Muhibbah, Peserai, 83000 Batu Pahat, Johor',
  },
}
