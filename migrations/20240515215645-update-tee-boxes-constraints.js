'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Remove the existing primary key constraint if it exists
    try {
      await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_pkey');
    } catch (error) {
      console.log('Primary key constraint "tee_boxes_pkey" does not exist, skipping removal.');
    }

    // Add the composite unique constraint
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['teetype', 'teeColor', 'holeNumber', 'courseID', 'clubID'],
      type: 'unique',
      name: 'unique_tee_boxes'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the composite unique constraint
    await queryInterface.removeConstraint('tee_boxes', 'unique_tee_boxes');
    
    // Add the original primary key constraint
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['teetype', 'teeColor', 'holeNumber'],
      type: 'primary key',
      name: 'tee_boxes_pkey'
    });
  }
};
