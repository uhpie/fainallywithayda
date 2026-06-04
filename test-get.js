const fetch = require('node-fetch'); // Not using node-fetch, using native
async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwbGwJ2GYS8K79db9RdMkwzn6MOUKskhgmK6CTzJDaSoEOhQCDCnqwXoANpRtVpIJP72w/exec";
  const r = await fetch(url);
  const text = await r.text();
  console.log(text.substring(0, 500));
}
test();
