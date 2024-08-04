const express = require('express');
const { getCourses } = require('../controllers/guestController');
const router = express.Router();

router.get('/courses', getCourses);

module.exports = router;
