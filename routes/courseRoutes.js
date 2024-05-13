const express = require('express');
const router = express.Router();
const Course = require('./models/Course');
const Hole = require('../models/Hole');
const TeeBox = require('../models/TeeBox');

// GET all courses
router.get('/', async (req, res) => {
    try {
        const courses = await Course.findAll({
            include: {
                model: Hole,
                include: TeeBox
            }
        });
        res.json({ numCourses: courses.length, courses });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// POST a new course
router.post('/', async (req, res) => {
    try {
        const newCourse = await Course.create(req.body);
        res.status(201).json(newCourse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;