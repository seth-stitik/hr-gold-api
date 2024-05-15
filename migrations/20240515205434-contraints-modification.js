'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop the existing primary key constraint on holeNumber
    await queryInterface.removeConstraint('holes', 'holes_pkey');

    // Modify the table to add the composite primary key
    await queryInterface.changeColumn('holes', 'holeNumber', {
      type: Sequelize.INTEGER,
      allowNull: false,
    });

    await queryInterface.changeColumn('holes', 'courseID', {
      type: Sequelize.STRING,
      allowNull: false,
    });

    await queryInterface.addConstraint('holes', {
      fields: ['holeNumber', 'courseID'],
      type: 'primary key',
      name: 'holes_pkey'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove composite primary key constraint
    await queryInterface.removeConstraint('holes', 'holes_pkey');

    // Re-add original primary key constraint on holeNumber
    await queryInterface.addConstraint('holes', {
      fields: ['holeNumber'],
      type: 'primary key',
      name: 'holes_pkey'
    });
  }
};
