const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/auth');

router.use('/auth', require('./auth'));
router.use('/devices', AuthMiddleware(true), require('./devices'));

module.exports = router;