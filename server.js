require('dotenv').config();
const app = require('./api/index.js');
const PORT = process.env.PORT || 3000;

app.listen(PORT, '127.0.0.1', () => {
  console.log(`API Server running on port ${PORT}`);
});
