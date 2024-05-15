const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Hole = sequelize.define('Hole', {
    holeNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
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
      primaryKey: true,
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
  });

  Hole.associate = (models) => {
    Hole.hasMany(models.TeeBox, { foreignKey: 'holeNumber' });
    Hole.belongsTo(models.Course, { foreignKey: 'courseID' });
  };

  return Hole;
};
