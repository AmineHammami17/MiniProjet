const asyncHandler = require('express-async-handler');
const Teacher = require('../models/teacher');

// @desc    Get all teachers
// @route   GET /api/v1/teachers
// @access  Public
exports.getTeachers = asyncHandler(async (req, res) => {
  const teachers = await Teacher.find().populate('user', 'name lastname email');
  res.status(200).json({ data: teachers });
});

// @desc    Get single teacher by ID
// @route   GET /api/v1/teachers/:id
// @access  Public
exports.getTeacherById = asyncHandler(async (req, res) => {
  const teacher = await Teacher.findById(req.params.id).populate('user', 'name lastname email');
  if (!teacher) {
    res.status(404).json({ message: 'Teacher not found' });
  } else {
    res.status(200).json({ data: teacher });
  }
});

// @desc    Create a new teacher
// @route   POST /api/v1/teachers
// @access  Private
exports.createTeacher = asyncHandler(async (req, res) => {
  const { user, department, title } = req.body;
  const newTeacher = await Teacher.create({ user, department, title });
  res.status(201).json({ data: newTeacher });
});

// @desc    Update a teacher
// @route   PUT /api/v1/teachers/:id
// @access  Private
exports.updateTeacher = asyncHandler(async (req, res) => {
  const { user, department, title } = req.body;
  const updatedTeacher = await Teacher.findByIdAndUpdate(req.params.id, { user, department, title }, { new: true });
  if (!updatedTeacher) {
    res.status(404).json({ message: 'Teacher not found' });
  } else {
    res.status(200).json({ data: updatedTeacher });
  }
});

// @desc    Delete a teacher
// @route   DELETE /api/v1/teachers/:id
// @access  Private
exports.deleteTeacher = asyncHandler(async (req, res) => {
  const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
  if (!deletedTeacher) {
    res.status(404).json({ message: 'Teacher not found' });
  } else {
    res.status(200).json({ message: 'Teacher deleted successfully' });
  }
});
