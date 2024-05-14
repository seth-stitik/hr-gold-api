const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Course = sequelize.define('Course', {
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
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    }
  }, {
    tableName: 'courses',
    timestamps: true
  });

  Course.associate = (models) => {
    Course.belongsTo(models.GolfClub, { foreignKey: 'golfClubName' });
    Course.hasMany(models.Hole, { foreignKey: 'courseID' });
  };

  return Course;
};
// Redeploy