const express = require('express');
const router = express.Router();
const GolfClub = require('../models/GolfClub');
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
    try {
        const newClub = await GolfClub.create(req.body);
        res.status(201).json(newClub);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;