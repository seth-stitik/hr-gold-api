// models/GolfClub.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const GolfClub = sequelize.define('GolfClub', {
    clubID: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
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
      type: DataTypes.INTEGER,
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

  GolfClub.associate = (models) => {
    GolfClub.hasMany(models.Course, { foreignKey: 'clubID' });
  };

  return GolfClub;
};
