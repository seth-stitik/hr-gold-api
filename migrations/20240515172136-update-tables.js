'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Update the courses table
    await queryInterface.addColumn('courses', 'clubID', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'golf_clubs',
        key: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Update the holes table
    await queryInterface.addColumn('holes', 'clubID', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'golf_clubs',
        key: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Update the tee_boxes table
    await queryInterface.addColumn('tee_boxes', 'clubID', {
      type: Sequelize.STRING,
      allowNull: false,
      references: {
        model: 'golf_clubs',
        key: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Add foreign key constraint to courses table
    await queryInterface.addConstraint('courses', {
      fields: ['clubID'],
      type: 'foreign key',
      name: 'fk_courses_clubID',
      references: {
        table: 'golf_clubs',
        field: 'clubID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Add foreign key constraint to holes table
    await queryInterface.addConstraint('holes', {
      fields: ['courseID'],
      type: 'foreign key',
      name: 'fk_holes_courseID',
      references: {
        table: 'courses',
        field: 'courseID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });

    // Add foreign key constraint to tee_boxes table
    await queryInterface.addConstraint('tee_boxes', {
      fields: ['holeNumber'],
      type: 'foreign key',
      name: 'fk_tee_boxes_holeNumber',
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
      name: 'fk_tee_boxes_courseID',
      references: {
        table: 'courses',
        field: 'courseID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove foreign key constraints
    await queryInterface.removeConstraint('courses', 'fk_courses_clubID');
    await queryInterface.removeConstraint('holes', 'fk_holes_courseID');
    await queryInterface.removeConstraint('tee_boxes', 'fk_tee_boxes_holeNumber');
    await queryInterface.removeConstraint('tee_boxes', 'fk_tee_boxes_courseID');

    // Remove columns
    await queryInterface.removeColumn('courses', 'clubID');
    await queryInterface.removeColumn('holes', 'clubID');
    await queryInterface.removeColumn('tee_boxes', 'clubID');
  }
};
