const fetch = require('node-fetch');
async function test() {
  const url = "https://script.google.com/macros/s/AKfycbwbGwJ2GYS8K79db9RdMkwzn6MOUKskhgmK6CTzJDaSoEOhQCDCnqwXoANpRtVpIJP72w/exec";
  const r = await fetch(url);
  const data = await r.json();
  console.log(data);
}
test();
