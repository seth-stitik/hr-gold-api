'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Ensure the primary key constraint is correct
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_pkey');
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['teetype', 'teeColor', 'holeNumber', 'courseID', 'clubID'],
      type: 'primary key',
      name: 'tee_boxes_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_pkey');
  }
};
