const express = require('express');
const router = express.Router();

router.use('/auth', require('./auth'));
router.use('/devices', require('./devices'));

module.exports = router;