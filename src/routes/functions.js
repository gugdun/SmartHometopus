const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/', (req, res) => {
  res.end(`GET /devices/${req.params.device_id}/functions`);
});

router.post('/:func_id', (req, res) => {
  res.end(`GET /devices/${req.params.device_id}/functions/${req.params.func_id}`);
});

module.exports = router;