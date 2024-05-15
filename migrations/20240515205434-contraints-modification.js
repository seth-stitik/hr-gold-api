'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      // Remove foreign key constraints from tee_boxes if they exist
      await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_holeNumber_fkey', { ifExists: true });
      await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_courseID_fkey', { ifExists: true });
      await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_clubID_fkey', { ifExists: true });

      // Remove primary key constraint from holes table
      await queryInterface.removeConstraint('holes', 'holes_pkey', { ifExists: true });

      // Modify columns to allow composite primary key
      await queryInterface.changeColumn('holes', 'holeNumber', {
        type: Sequelize.INTEGER,
        allowNull: false,
      });

      await queryInterface.changeColumn('holes', 'courseID', {
        type: Sequelize.STRING,
        allowNull: false,
      });

      // Add composite primary key constraint
      await queryInterface.addConstraint('holes', {
        fields: ['holeNumber', 'courseID'],
        type: 'primary key',
        name: 'holes_pkey'
      });

      // Re-add foreign key constraints on tee_boxes
      await queryInterface.addConstraint('tee_boxes', {
        fields: ['holeNumber', 'courseID'],
        type: 'foreign key',
        name: 'tee_boxes_holeNumber_courseID_fkey',
        references: {
          table: 'holes',
          fields: ['holeNumber', 'courseID']
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
    } catch (error) {
      console.error('Error during migration:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      // Remove foreign key constraints from tee_boxes
      await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_holeNumber_courseID_fkey', { ifExists: true });
      await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_clubID_fkey', { ifExists: true });

      // Remove composite primary key constraint from holes
      await queryInterface.removeConstraint('holes', 'holes_pkey', { ifExists: true });

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
    } catch (error) {
      console.error('Error during rollback:', error);
      throw error;
    }
  }
};
