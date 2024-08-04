const mongoose = require('mongoose');

const CourseSchema = new mongoose.Schema({
  id: {type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  difficulty: { type: String, required: true },
  description: { type: String, required: true }
});

module.exports = mongoose.model('Course', CourseSchema);
