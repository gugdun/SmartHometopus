const config = require('../config');
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: config.db.dialect,
  storage: config.db.path
});

module.exports = sequelize;