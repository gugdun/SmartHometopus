const { DataTypes } = require('sequelize');
const db = require('../services/db');

const Code = db.define('Code', {
  code: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  clientId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  redirectUri: {
    type: DataTypes.STRING,
    allowNull: true
  },
  expiresIn: {
    type: DataTypes.DATE,
    allowNull: false
  }
});

Code.sync();

module.exports = Code;