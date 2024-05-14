const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const TeeBox = require('./TeeBox'); 

const Hole = sequelize.define('hole', {
    holeNumber: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    par: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    yardage: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    handicap: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

Hole.hasMany(TeeBox, { foreignKey: 'holeNumber' });
TeeBox.belongsTo(Hole, { foreignKey: 'holeNumber' });

module.exports = Hole;
