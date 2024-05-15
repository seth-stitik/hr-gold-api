'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Drop foreign key constraints on tee_boxes
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_holeNumber_fkey');
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_courseID_fkey');
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_clubID_fkey');

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

    // Re-add foreign key constraints on tee_boxes
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['holeNumber'],
      type: 'foreign key',
      name: 'tee_boxes_holeNumber_fkey',
      references: {
        table: 'holes',
        field: 'holeNumber'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['courseID'],
      type: 'foreign key',
      name: 'tee_boxes_courseID_fkey',
      references: {
        table: 'holes',
        field: 'courseID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['clubID'],
      type: 'foreign key',
      name: 'tee_boxes_clubID_fkey',
      references: {
        table: 'golf_clubs',
        field: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraints from tee_boxes
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_holeNumber_fkey');
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_courseID_fkey');
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_clubID_fkey');

    // Remove composite primary key constraint
    await queryInterface.removeConstraint('holes', 'holes_pkey');

    // Re-add original primary key constraint on holeNumber
    await queryInterface.addConstraint('holes', {
      fields: ['holeNumber'],
      type: 'primary key',
      name: 'holes_pkey'
    });

    // Re-add foreign key constraints to tee_boxes
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['holeNumber'],
      type: 'foreign key',
      name: 'tee_boxes_holeNumber_fkey',
      references: {
        table: 'holes',
        field: 'holeNumber'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['courseID'],
      type: 'foreign key',
      name: 'tee_boxes_courseID_fkey',
      references: {
        table: 'holes',
        field: 'courseID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['clubID'],
      type: 'foreign key',
      name: 'tee_boxes_clubID_fkey',
      references: {
        table: 'golf_clubs',
        field: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  }
};
