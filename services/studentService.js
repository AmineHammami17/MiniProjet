const asyncHandler = require('express-async-handler');
const Student = require('../models/student');

// @desc    Get all students
// @route   GET /api/v1/students
// @access  Public
exports.getStudents = asyncHandler(async (req, res) => {
  const students = await Student.find()
    .populate('group', 'number')
    .populate('speciality', 'name abbreviation')
    .populate('level', 'name')
    .populate('user', 'name lastname email CIN');
  
  res.status(200).json({ data: students });
});


// @desc    Get student by ID
// @route   GET /api/v1/students/:id
// @access  Public
exports.getStudentById = asyncHandler(async (req, res) => {
  const student = await Student.findById(req.params.id) 
  .populate('group', 'number')
  .populate('speciality', 'name abbreviation')
  .populate('level', 'name')
  .populate('user', 'name lastname email CIN');;
  if (!student) {
    res.status(404).json({message: 'Student not found' });
  } else {
    res.status(200).json({data: student });
  }
});

// @desc    Create new student
// @route   POST /api/v1/students
// @access  Public
exports.createStudent = asyncHandler(async (req, res) => {
  const student = await Student.create(req.body);
  res.status(201).json({data: student });
});

// @desc    Update student by ID
// @route   PUT /api/v1/students/:id
// @access  Public
exports.updateStudent = asyncHandler(async (req, res) => {
  const student = await Student.findOneAndUpdate({_id: req.params.id}, req.body, {
    new: true
    });
  if (!student) {
    res.status(404).json({message: 'Student not found' });
  } else {
    res.status(200).json({data: student });
  }
});


// @desc    Delete student by ID
// @route   DELETE /api/v1/students/:id
// @access  Public
exports.deleteStudent = asyncHandler(async (req, res) => {
  const student = await Student.findByIdAndDelete(req.params.id);
  if (!student) {
    res.status(404).json({message: 'Student not found' });
  } else {
    res.status(200).json({message: 'Student deleted successfully' });
  }
});


exports.getStudentsByGroup = asyncHandler(async (req, res) => {
  const groupId = req.params.groupId;

  const students = await Student.find({ group: groupId })
    .populate({
      path: 'user',
      select: 'name lastname CIN -_id'
    })
    .select('-internships -UniversitySituation -speciality -level -group -_id'); 

  res.status(200).json({ data: students });
});
