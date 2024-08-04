const mongoose = require('mongoose');
const Course = require('../models/Course');

const getCourses = async (req, res) => {
  const { page = 1, limit = 10, category, difficulty } = req.query;
  
  try {
    const query = {};
    if (category) query.category = category;
    if (difficulty) query.difficulty = difficulty;
    
    const totalCourses = await Course.countDocuments(query);
   
    const courses = await Course.find()
      .skip((page - 1) * parseInt(limit))
      .limit(parseInt(limit));
    console.log(courses , " ----------------")
    const totalPages = Math.ceil(totalCourses / limit);

    res.json({ courses: courses, page: parseInt(page), totalPages: totalPages });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching courses', error: err.message });
  }
};

module.exports = { getCourses };

