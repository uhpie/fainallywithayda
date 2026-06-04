require('dotenv').config()
const { createClient } = require('@supabase/supabase-js')

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
)

async function test() {
  const { data, error } = await supabase
    .from('rsvps')
    .insert([
      { name: 'Test User', phone: '0123456789', pax: 1, attendance: 'hadir', message: 'Test message' }
    ])
  
  if (error) {
    console.error('ERROR:', error)
  } else {
    console.log('SUCCESS:', data)
  }
}

test()
