'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_pkey');
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['teetype', 'teeColor', 'holeNumber'],
      type: 'primary key',
      name: 'tee_boxes_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_pkey');
    await queryInterface.addColumn('tee_boxes', 'id', {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    });
  }
};
