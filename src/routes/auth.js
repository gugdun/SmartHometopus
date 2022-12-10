const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/auth');

router.get('/code', AuthController.getCode);
router.post('/token', AuthController.getToken);
router.post('/refresh', AuthController.refreshToken); // TODO: auth middleware

module.exports = router;