const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.end('GET /devices');
});

router.get('/:device_id', (req, res) => {
  res.end(`GET /devices/${req.params.device_id}`);
});

router.delete('/:device_id', (req, res) => {
  res.end(`DELETE /devices/${req.params.device_id}`);
});

router.use('/:device_id/functions', require('./functions'));

module.exports = router;