const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/auth');
const AuthController = require('../controllers/auth');

router.get('/code', AuthController.getCode);
router.post('/token', AuthController.getToken);
router.post('/refresh', AuthMiddleware(false), AuthController.refreshToken); // TODO: auth middleware

module.exports = router;