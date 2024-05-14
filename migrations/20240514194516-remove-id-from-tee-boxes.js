'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('tee_boxes', 'id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('tee_boxes', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    });
  }
};
