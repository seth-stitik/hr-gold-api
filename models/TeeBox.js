module.exports = (sequelize, DataTypes) => {
    const TeeBox = sequelize.define('TeeBox', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      teetype: {
        type: DataTypes.STRING,
        allowNull: false
      },
      teeColor: {
        type: DataTypes.STRING,
        allowNull: false
      },
      distance: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      holeNumber: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    });
  
    TeeBox.associate = (models) => {
      TeeBox.belongsTo(models.Hole, { foreignKey: 'holeNumber' });
    };
  
    return TeeBox;
  };
  