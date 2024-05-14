const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Hole = require('./Hole');

const TeeBox = sequelize.define('TeeBox', {
    teetype: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    teeColor: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    distance: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    holeNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Holes',
            key: 'holeNumber'
        }
    }
}, {
    timestamps: true,
    tableName: 'tee_boxes'
});

TeeBox.belongsTo(Hole, { foreignKey: 'holeNumber' });

module.exports = TeeBox;
