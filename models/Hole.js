module.exports = (sequelize, DataTypes) => {
    const Hole = sequelize.define('Hole', {
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
      },
      courseID: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: 'courses',
          key: 'courseID'
        }
      }
    }, {
      tableName: 'holes',
      timestamps: true
    });
  
    Hole.associate = (models) => {
      Hole.hasMany(models.TeeBox, { foreignKey: 'holeNumber' });
      Hole.belongsTo(models.Course, { foreignKey: 'courseID' });
    };
  
    return Hole;
  };
  