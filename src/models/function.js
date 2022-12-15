const { DataTypes } = require('sequelize');
const db = require('../services/db');

const Parameter = require('./parameter');

const Function = db.define('Function', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

Parameter.belongsTo(Function);
Function.hasMany(Parameter);

module.exports = Function;