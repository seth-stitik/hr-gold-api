const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GolfClub = sequelize.define('GolfClub', {
  name: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  clubID: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  timeStampUpdated: {
    type: DataTypes.BIGINT,
    allowNull: false
  },
  distance: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  measureUnit: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'golf_clubs',
  timestamps: true
});

module.exports = GolfClub;
