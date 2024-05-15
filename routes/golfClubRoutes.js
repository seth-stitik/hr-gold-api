// routes/golfClubRoutes.js
const express = require('express');
const router = express.Router();
const { sequelize, GolfClub, Course, Hole, TeeBox } = require('../models');

// Function to create a golf club with courses, holes, and tee boxes
const createGolfClub = async (req, res) => {
  const { golfClub, courses } = req.body;

  // debug logs
  console.log("Request Body:", req.body);
  console.log("Golf Club:", golfClub);
  console.log("Courses:", courses);

  try {
    await sequelize.transaction(async (t) => {
      const newGolfClub = await GolfClub.create(golfClub, { transaction: t });

      for (const course of courses) {
        const newCourse = await Course.create(
          {
            ...course,
            golfClubName: newGolfClub.name, // Ensure this field matches your model definition
            clubID: newGolfClub.clubID
          },
          { transaction: t }
        );

        for (const hole of course.holes) {
          const newHole = await Hole.create(
            {
              holeNumber: hole.holeNumber,
              par: hole.par,
              yardage: hole.yardage,
              handicap: hole.handicap,
              courseID: newCourse.courseID,
              clubID: newGolfClub.clubID
            },
            { transaction: t }
          );

          for (const teeBox of hole.teeBoxes) {
            await TeeBox.create(
              {
                ...teeBox,
                holeNumber: newHole.holeNumber,
                courseID: newCourse.courseID,
                clubID: newGolfClub.clubID
              },
              { transaction: t }
            );
          }
        }
      }
    });

    res.status(201).json({ message: 'Golf club with courses, holes, and tee boxes created successfully.' });
  } catch (error) {
    console.error('Error creating golf club:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// POST a new golf club with courses, holes, and tee boxes
router.post('/', createGolfClub);

module.exports = router;
