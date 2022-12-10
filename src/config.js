module.exports = {
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  db: {
    dialect: 'sqlite',
    path: 'database.sqlite'
  },
  auth: {
    clients: [
      {
        clientId: 'a70f16e38d9d4e18bcce2927a31483b9'
      }
    ],
    code: {
      expiresIn: 300 // 5 minutes
    },
    token: {
      accessExpiresIn: 86400,   // 1 day
      refreshExpiresIn: 2592000 // 30 days
    }
  }
};