'use strict';
module.exports = (sequelize, DataTypes) => {
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
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    },
    clubID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'golf_clubs',
        key: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'tee_boxes',
    timestamps: true
  });

  TeeBox.associate = (models) => {
    TeeBox.belongsTo(models.Hole, { foreignKey: 'holeNumber' });
  };

  return TeeBox;
};
