const express = require('express');
const router = express.Router();
const { Hole, TeeBox } = require('../models'); 

// GET all holes
router.get('/', async (req, res) => {
    try {
        const holes = await Hole.findAll({
            include: TeeBox
        });
        res.json({ numHoles: holes.length, holes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new hole
router.post('/', async (req, res) => {
    try {
        const newHole = await Hole.create(req.body);
        res.status(201).json(newHole);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' });
    }
});

// Add more routes for editing and deleting later

module.exports = router;
