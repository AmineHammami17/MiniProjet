const Classroom = require('../models/classroom');
const asyncHandler = require('express-async-handler');

// @desc  Get list of classrooms
// @route GET  /api/v1/classrooms
// @access Public
exports.getClassrooms = asyncHandler(async (req, res) => {
  const classrooms = await Classroom.find({});
  res.status(200).json({ data: classrooms });
});

// @desc  Get classroom by ID
// @route GET  /api/v1/classrooms/:id
// @access Public
exports.getClassroomById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classroom = await Classroom.findById(id);
  if (!classroom) {
    res.status(404).json({ msg: 'No classroom found with the id:', id });
  }
  res.status(200).json({ data: classroom });
});

// @desc  Create Classroom
// @route POST /api/v1/classrooms
// @access Private
exports.createClassroom = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const classroom = await Classroom.create({ name });
  res.status(201).json({ data: classroom });
});

// @desc  Update Classroom
// @route PUT /api/v1/classrooms/:id
// @access Private
exports.updateClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name must be provided for update' });
  }
  const classroom = await Classroom.findByIdAndUpdate(
    id,
    { name },
    { new: true }
  );
  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found' });
  }
  res.status(200).json({ data: classroom });
});

// @desc  Delete Classroom
// @route DELETE /api/v1/classrooms/:id
// @access Private
exports.deleteClassroom = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const classroom = await Classroom.findByIdAndDelete(id);
  if (!classroom) {
    return res.status(404).json({ error: 'Classroom not found' });
  }
  res.status(200).json('Deleted Successfully');
});
