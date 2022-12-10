// Load server configuration and environment variables
const config = require('./config');
const dotenv = require('dotenv');

dotenv.config();

// Setup Express application
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(require('./routes'));

(async () => {
  try {
    // Check database connection
    const db = require('./services/db');
    await db.authenticate();
    console.info('Database connection has been established successfully 💃');

    // Start listening on specified port and host address
    const server = app.listen(config.server.port, config.server.host, () => {
      console.info(`Listening on ${server.address().address}:${server.address().port} 👂`);
    });
  } catch (error) {
    console.error(`⛔ ${error}`);
  }
})();