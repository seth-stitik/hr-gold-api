module.exports = (sequelize, DataTypes) => {
    const GolfClub = sequelize.define('GolfClub', {
      name: {
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
  
    GolfClub.associate = (models) => {
      GolfClub.hasMany(models.Course, { foreignKey: 'golfClubName' });
    };
  
    return GolfClub;
  };
  