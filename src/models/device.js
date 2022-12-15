const { DataTypes } = require('sequelize');
const db = require('../services/db');

const Function = require('./function');

const Device = db.define('Device', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  },
  ip: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Function.belongsTo(Device);
Device.hasMany(Function);

module.exports = Device;