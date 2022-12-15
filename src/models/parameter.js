const { DataTypes } = require('sequelize');
const db = require('../services/db');

const Parameter = db.define('Parameter', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Parameter.sync();

module.exports = Parameter;