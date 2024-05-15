const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Hole = sequelize.define('Hole', {
  holeNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  par: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  yardage: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  handicap: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  courseID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'courseID',
    },
  },
  clubID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'golf_clubs',
      key: 'clubID',
    },
  },
}, {
  tableName: 'holes',
  timestamps: true,
  uniqueKeys: {
    unique_hole_course: {
      fields: ['holeNumber', 'courseID'],
    },
  },
});

Hole.associate = (models) => {
  Hole.hasMany(models.TeeBox, { foreignKey: 'holeNumber' });
  Hole.belongsTo(models.Course, { foreignKey: 'courseID' });
};

module.exports = Hole;
