'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('golf_clubs', 'clubName');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('golf_clubs', 'clubName', {
      type: Sequelize.STRING,
      allowNull: false
    });
  }
};
