'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_pkey');
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['holeNumber', 'courseID', 'clubID', 'teetype', 'teeColor'],
      type: 'primary key',
      name: 'tee_boxes_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_pkey');
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['holeNumber', 'courseID', 'clubID', 'teetype', 'teeColor'],
      type: 'primary key',
      name: 'tee_boxes_pkey'
    });
  }
};
