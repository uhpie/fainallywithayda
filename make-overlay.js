const fs = require('fs');

// A 1x1 transparent pixel base64 is enough for a placeholder, 
// but let's just make a simple SVG and convert it or just leave an SVG as the overlay?
// Actually, it's better to just put a dummy image, or the canvas will fail if image not found.
// Let's create a 1x1 transparent PNG.
const transparentPNG = Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==', 'base64');

fs.writeFileSync('/Users/pie/Documents/fainallywithayda/client/public/overlay.png', transparentPNG);
console.log('Created overlay.png');
