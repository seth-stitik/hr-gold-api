const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Hole = require('./Hole'); 

const Course = sequelize.define('course', {
    courseID: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    courseName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numHoles: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    timeStampUpdated: {
        type: DataTypes.BIGINT,
        allowNull: false
    },
    golfClubName: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'golf_clubs',
            key: 'name'
        }
    }
});

Course.hasMany(Hole, { foreignKey: 'courseID' });
Hole.belongsTo(Course, { foreignKey: 'courseID' });

module.exports = Course;
