const express = require('express');
const router = express.Router();

router.get('/code', (req, res) => {
  res.end('GET /auth/code');
});

router.post('/token', (req, res) => {
  res.end('POST /auth/token');
});

module.exports = router;