const Teaching = require('../models/teaching');
const asyncHandler = require('express-async-handler');

// @desc    Get all teachings
// @route   GET /api/v1/teachings
// @access  Public
exports.getTeachings = asyncHandler(async (req, res) => {
  const teachings = await Teaching.find()
    .populate({
      path: 'teacher',
      populate: {
        path: 'user',
        select: 'name lastname' 
      }
    })
    .populate('subject', 'name code'); 
  
  res.status(200).json({ data: teachings });
});

// @desc    Get teaching by ID
// @route   GET /api/v1/teachings/:id
// @access  Public
exports.getTeachingById = asyncHandler(async (req, res) => {
  const teaching = await Teaching.findById(req.params.id)
    .populate({
      path: 'teacher',
      populate: {
        path: 'user',
        select: 'name lastname' 
      }
    })
    .populate('subject', 'name'); 
  
  if (!teaching) {
    res.status(404).json({ message: 'Teaching not found' });
  } else {
    res.status(200).json({ data: teaching });
  }
});

// @desc    Create a new teaching
// @route   POST /api/v1/teachings
// @access  Private
exports.createTeaching = asyncHandler(async (req, res) => {
  const teaching = await Teaching.create(req.body);
  res.status(201).json({ data: teaching });
});

// @desc    Update a teaching
// @route   PUT /api/v1/teachings/:id
// @access  Private
exports.updateTeaching = asyncHandler(async (req, res) => {
  const teaching = await Teaching.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!teaching) {
    res.status(404).json({ message: 'Teaching not found' });
  } else {
    res.status(200).json({ data: teaching });
  }
});

// @desc    Delete a teaching
// @route   DELETE /api/v1/teachings/:id
// @access  Private
exports.deleteTeaching = asyncHandler(async (req, res) => {
  const teaching = await Teaching.findByIdAndDelete(req.params.id);
  if (!teaching) {
    res.status(404).json({ message: 'Teaching not found' });
  } else {
    res.status(200).json({ message: 'Teaching deleted successfully' });
  }
});
