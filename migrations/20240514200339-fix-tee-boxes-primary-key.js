'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the existing primary key constraint
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_pkey');

    // Add the composite primary key constraint
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['teetype', 'teeColor', 'holeNumber'],
      type: 'primary key',
      name: 'tee_boxes_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the composite primary key constraint
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_pkey');

    // Restore the original primary key constraint (if needed)
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['teetype', 'teeColor'],
      type: 'primary key',
      name: 'tee_boxes_pkey'
    });
  }
};
