const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/database'); // Ensure this import is correct
const GolfClub = require('../models/GolfClub');
const Course = require('../models/Course');
const Hole = require('../models/Hole');
const TeeBox = require('../models/TeeBox');

// POST a new golf club with courses, holes, and tee boxes
router.post('/', async (req, res) => {
    const { golfClub, courses } = req.body;
    
    // Add debug logs
    console.log("Request Body:", req.body);
    console.log("Golf Club:", golfClub);
    console.log("Courses:", courses);

    try {
        await sequelize.transaction(async (t) => {
            const newGolfClub = await GolfClub.create(golfClub, { transaction: t });
            
            for (const course of courses) {
                const newCourse = await Course.create({ ...course, golfClubName: newGolfClub.name }, { transaction: t });
                
                for (const hole of course.holes) {
                    const newHole = await Hole.create({ ...hole, courseID: newCourse.courseID }, { transaction: t });
                    
                    for (const teeBox of hole.teeBoxes) {
                        await TeeBox.create({ ...teeBox, holeNumber: newHole.holeNumber }, { transaction: t });
                    }
                }
            }
        });

        res.status(201).json({ message: 'Golf club with courses, holes, and tee boxes created successfully.' });
    } catch (error) {
        console.error("Error creating golf club:", error);
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
