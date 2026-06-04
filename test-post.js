async function test() {
  const url = 'https://script.google.com/macros/s/AKfycbwbGwJ2GYS8K79db9RdMkwzn6MOUKskhgmK6CTzJDaSoEOhQCDCnqwXoANpRtVpIJP72w/exec';
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fileName: 'test.jpg',
      mimeType: 'image/jpeg',
      fileBase64: 'base64str'
    })
  });
  const text = await response.text();
  console.log(text.substring(0, 1000));
}
test();
