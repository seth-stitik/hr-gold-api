'use strict';

const checkAndRemoveConstraint = async (queryInterface, tableName, constraintName) => {
  const constraints = await queryInterface.showConstraint(tableName);
  const constraintExists = constraints.some((constraint) => constraint.constraintName === constraintName);

  if (constraintExists) {
    console.log(`Removing constraint ${constraintName} from table ${tableName}...`);
    await queryInterface.removeConstraint(tableName, constraintName);
  } else {
    console.log(`Constraint ${constraintName} does not exist on table ${tableName}. Skipping removal.`);
  }
};

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      await checkAndRemoveConstraint(queryInterface, 'tee_boxes', 'tee_boxes_holeNumber_fkey');
      await checkAndRemoveConstraint(queryInterface, 'tee_boxes', 'tee_boxes_courseID_fkey');
      await checkAndRemoveConstraint(queryInterface, 'tee_boxes', 'tee_boxes_clubID_fkey');

      console.log('Removing primary key constraint from holes...');
      await queryInterface.removeConstraint('holes', 'holes_pkey');

      console.log('Adding composite primary key constraint to holes...');
      await queryInterface.addConstraint('holes', {
        fields: ['holeNumber', 'courseID'],
        type: 'primary key',
        name: 'holes_pkey',
      });

      console.log('Re-adding foreign key constraints to tee_boxes...');
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

      console.log('Migration completed successfully.');
    } catch (error) {
      console.error('Error during migration:', error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      console.log('Removing foreign key constraints from tee_boxes...');
      await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_holeNumber_fkey');
      await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_courseID_fkey');
      await queryInterface.removeConstraint('tee_boxes', 'tee_boxes_clubID_fkey');

      console.log('Removing composite primary key constraint from holes...');
      await queryInterface.removeConstraint('holes', 'holes_pkey');

      console.log('Adding original primary key constraint to holes...');
      await queryInterface.addConstraint('holes', {
        fields: ['holeNumber'],
        type: 'primary key',
        name: 'holes_pkey',
      });

      console.log('Re-adding foreign key constraints to tee_boxes...');
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

      console.log('Rollback completed successfully.');
    } catch (error) {
      console.error('Error during rollback:', error);
      throw error;
    }
  }
};
