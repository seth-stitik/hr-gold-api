const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

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
      model: 'holes',
      key: 'holeNumber'
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  courseID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'courses',
      key: 'courseID'
    }
  },
  clubID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'golf_clubs',
      key: 'clubID'
    }
  }
}, {
  tableName: 'tee_boxes',
  timestamps: true,
  primaryKey: ['teetype', 'teeColor', 'holeNumber']
});

TeeBox.associate = (models) => {
  TeeBox.belongsTo(models.Hole, { foreignKey: 'holeNumber' });
};

module.exports = TeeBox;
