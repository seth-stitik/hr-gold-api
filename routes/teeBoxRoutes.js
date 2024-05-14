const express = require('express');
const router = express.Router();
const { TeeBox } = require('../models'); 

// GET all tee boxes
router.get('/', async (req, res) => {
    try {
        const teeBoxes = await TeeBox.findAll();
        res.json({ numTeeBoxes: teeBoxes.length, teeBoxes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new tee box
router.post('/', async (req, res) => {
    try {
        const newTeeBox = await TeeBox.create(req.body);
        res.status(201).json(newTeeBox);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Add more routes for editing and deleting later

module.exports = router;
