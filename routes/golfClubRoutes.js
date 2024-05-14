const express = require('express');
const router = express.Router();
const GolfClub = require('../models/GolfClub');
const Course = require('../models/Course');
const Hole = require('../models/Hole');
const TeeBox = require('../models/TeeBox');

// Get all golf clubs
router.get('/', async (req, res) => {
    try {
        const clubs = await GolfClub.findAll({
            include: {
                model: Course,
                include: {
                    model: Hole,
                    include: TeeBox
                }
            }
        });
        res.json({ numClubs: clubs.length, clubs });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new golf club
router.post('/', async (req, res) => {
    const { golfClub, courses } = req.body;
    
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
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;