const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const GolfClub = sequelize.define('golf_club', {
    name : {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
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
});

GolfClub.hasMany(GolfCourse, { foreignKey: 'golfClubName' });

module.exports = GolfClub;
