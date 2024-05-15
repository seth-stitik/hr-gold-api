'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('holes', 'holes_pkey');
    await queryInterface.addConstraint('holes', {
      fields: ['holeNumber', 'courseID'],
      type: 'unique',
      name: 'unique_hole_course'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('holes', 'unique_hole_course');
    await queryInterface.addConstraint('holes', {
      fields: ['holeNumber'],
      type: 'unique',
      name: 'holes_pkey'
    });
  }
};
