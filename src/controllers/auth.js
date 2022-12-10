const config = require('../config');
const Code = require('../models/code');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

async function getCode(req, res) {
  const state = req.query.state;
  const scope = req.query.scope;

  if (req.query.response_type !== 'code') {
    const body = { error: 'unsupported_response_type' };
    if (state) body.state = state;
    res.status(400).json(body);
    return;
  }

  let redirect_uri = req.query.redirect_uri;
  if (!redirect_uri || redirect_uri === '') {
    const body = { error: 'invalid_request' };
    if (state) body.state = state;
    res.status(400).json(body);
    return;
  }

  const client_id = req.query.client_id;
  if (!config.auth.clients.find(client => client.clientId === client_id)) {
    const body = { error: 'unauthorized_client' };
    if (state) body.state = state;
    res.status(401).json(body);
    return;
  }

  // Save code to database
  const code = await Code.create({
    code: uuidv4(),
    clientId: client_id,
    redirectUri: redirect_uri,
    expiresIn: new Date(Date.now() + config.auth.code.expiresIn * 1000)
  });

  // Append parameters to redirect URL
  redirect_uri += `?code=${code.code}`;
  if (state) redirect_uri += `&state=${state}`;
  redirect_uri += `&client_id=${client_id}`;
  if (scope) redirect_uri += `&scope=${scope}`;

  res.redirect(redirect_uri);
}

async function getToken(req, res) {
  const state = req.body.state;

  const grant_type = req.body.grant_type;
  if (grant_type !== 'authorization_code') {
    const body = { error: 'unsupported_response_type' };
    if (state) body.state = state;
    res.status(400).json(body);
    return;
  }

  const client_id = req.body.client_id;
  if (!config.auth.clients.find(client => client.clientId === client_id)) {
    const body = { error: 'unauthorized_client' };
    if (state) body.state = state;
    res.status(401).json(body);
    return;
  }

  const redirect_uri = req.body.redirect_uri;
  if (!redirect_uri || redirect_uri === '') {
    const body = { error: 'invalid_request' };
    if (state) body.state = state;
    res.status(400).json(body);
    return;
  }

  // Check authorization code
  const code = await Code.findOne({
    where: {
      code: req.body.code,
      clientId: client_id,
      redirectUri: redirect_uri
    }
  });

  if (!code || code.expiresIn < new Date(Date.now())) {
    const body = { error: 'unauthorized_client' };
    if (state) body.state = state;
    res.status(401).json(body);
    return;
  }

  // Generate access & refresh token pair
  const accessToken = jwt.sign({
    clientId: code.clientId,
    exp: config.auth.token.accessExpiresIn
  }, process.env.clientSecret);

  const refreshToken = jwt.sign({
    clientId: code.clientId,
    exp: config.auth.token.refreshExpiresIn
  }, process.env.serverSecret);

  // Format response
  const body = {
    access_token: accessToken,
    token_type: 'Bearer',
    expires_in: config.auth.token.accessExpiresIn,
    refresh_token: refreshToken
  };
  if (state) body.state = state;
  res.json(body);
}

function refreshToken(req, res) {

}

module.exports = {
  getCode,
  getToken,
  refreshToken
};