const Course = require('../models/Course');
const User = require('../models/User');
const axios = require('axios');

const enroll = async (req, res) => {

  const { courseId } = req.body;
  try {
    const course = await Course.findOne({ id: courseId });
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    req.user.enrollments.push(courseId);
    await req.user.save();
    res.json({ message: 'Successfully enrolled in the course.' });
  } catch (err) {
    res.status(500).json({ message: 'Error enrolling in the course', error: err.message });
  }
};

const cancelEnrollment = async (req, res) => {
  const { courseId } = req.body;
  try {
    req.user.enrollments = req.user.enrollments.filter(enrollment => enrollment.toString() !== courseId);
    await req.user.save();
    res.json({ message: 'Successfully canceled enrollment.' });
  } catch (err) {
    res.status(500).json({ message: 'Error canceling enrollment', error: err.message });
  }
};

const getMyCourses = async (req, res) => {
  try {
    const courses = await Course.find({ _id: { $in: req.user.enrollments } });
    res.json({ courses });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

module.exports = { enroll, cancelEnrollment, getMyCourses };
