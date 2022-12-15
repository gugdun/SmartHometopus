const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticate(checkExp, req, res, next) {
  const authorization = req.headers.authorization;
  if (!authorization || typeof authorization !== 'string' || authorization.indexOf(' ') < 1) {
    return invalidClientResponse(res);
  }

  const parts = authorization.split(' ');
  if (parts[0] !== 'Bearer') {
    return invalidClientResponse(res);
  }

  const token = jwt.verify(parts[1], process.env.clientSecret);
  if (!token) {
    return invalidClientResponse(res);
  }

  if (!config.auth.clients.find(client => client.clientId === token.clientId)) {
    return invalidClientResponse(res);
  }

  if (checkExp) {
    if (token.exp < Date.now() / 1000) {
      return res.status(401).json({
        message: 'unauthorized_client'
      });
    }
  }

  req.clientId = token.clientId;
  next();
}

function invalidClientResponse(res) {
  return res.status(401).json({
    message: 'invalid_client'
  });
}

module.exports = function(checkExp) {
  return function(req, res, next) {
    authenticate(checkExp, req, res, next);
  }
};