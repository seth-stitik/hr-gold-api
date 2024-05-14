'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('courses', 'golfClubName', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'golf_clubs',
        key: 'name'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('courses', 'golfClubName');
  }
};
