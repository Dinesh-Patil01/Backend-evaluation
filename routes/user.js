const express = require('express');
const { enroll, cancelEnrollment, getMyCourses } = require('../controllers/userController');
const { authenticateJWT } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/enroll', enroll);
router.post('/cancel-enrollment', authenticateJWT, cancelEnrollment);
router.get('/my-courses', authenticateJWT, getMyCourses);

module.exports = router;
