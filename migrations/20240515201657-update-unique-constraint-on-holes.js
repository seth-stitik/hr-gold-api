'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_holeNumber_fkey');
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_courseID_fkey');
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_clubID_fkey');

    await queryInterface.removeConstraint('holes', 'holes_pkey');

    await queryInterface.addConstraint('holes', {
      fields: ['holeNumber', 'courseID'],
      type: 'primary key',
      name: 'holes_pkey',
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['holeNumber'],
      type: 'foreign key',
      name: 'tee_boxes_holeNumber_fkey',
      references: {
        table: 'holes',
        field: 'holeNumber',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['courseID'],
      type: 'foreign key',
      name: 'tee_boxes_courseID_fkey',
      references: {
        table: 'courses',
        field: 'courseID',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['clubID'],
      type: 'foreign key',
      name: 'tee_boxes_clubID_fkey',
      references: {
        table: 'golf_clubs',
        field: 'clubID',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_holeNumber_fkey');
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_courseID_fkey');
    await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_clubID_fkey');

    await queryInterface.removeConstraint('holes', 'holes_pkey');

    await queryInterface.addConstraint('holes', {
      fields: ['holeNumber'],
      type: 'primary key',
      name: 'holes_pkey',
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['holeNumber'],
      type: 'foreign key',
      name: 'tee_boxes_holeNumber_fkey',
      references: {
        table: 'holes',
        field: 'holeNumber',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['courseID'],
      type: 'foreign key',
      name: 'tee_boxes_courseID_fkey',
      references: {
        table: 'courses',
        field: 'courseID',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });

    await queryInterface.addConstraint('tee_boxes', {
      fields: ['clubID'],
      type: 'foreign key',
      name: 'tee_boxes_clubID_fkey',
      references: {
        table: 'golf_clubs',
        field: 'clubID',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  }
};
