const https = require('https');

function followRedirects(url, options = {}, depth = 0) {
  if (depth > 5) return console.log('Too many redirects');
  
  const req = https.request(url, options, (res) => {
    console.log(`[Depth ${depth}] Status: ${res.statusCode} from ${url}`);
    console.log(`Headers:`, res.headers);
    
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      console.log(`Redirecting to: ${res.headers.location}`);
      // Usually POST turns into GET on 302, but let's follow standard
      const nextOptions = { method: res.statusCode === 307 || res.statusCode === 308 ? options.method : 'GET' };
      followRedirects(res.headers.location, nextOptions, depth + 1);
      return;
    }
    
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log(`Body (first 500 chars):\n${body.substring(0, 500)}`);
    });
  });
  
  req.on('error', e => console.error(e));
  
  if (options.body) {
    req.write(options.body);
  }
  req.end();
}

const payload = JSON.stringify({
  fileName: 'test.txt',
  mimeType: 'text/plain',
  fileBase64: 'SGVsbG8gV29ybGQ='
});

followRedirects('https://script.google.com/macros/s/AKfycbwbGwJ2GYS8K79db9RdMkwzn6MOUKskhgmK6CTzJDaSoEOhQCDCnqwXoANpRtVpIJP72w/exec', {
  method: 'POST',
  headers: {
    'Content-Type': 'text/plain;charset=utf-8',
    'Content-Length': Buffer.byteLength(payload)
  },
  body: payload
});
