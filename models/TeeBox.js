const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const TeeBox = sequelize.define('tee_box', {
    teetype: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    teeColor: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    distance: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = TeeBox;