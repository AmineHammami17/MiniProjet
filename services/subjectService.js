const Subject = require('../models/subject');
const Teacher = require('../models/teacher');
const Teaching = require('../models/teaching');
const asyncHandler = require('express-async-handler');

// @desc    Get all subjects
// @route   GET /api/v1/subjects
// @access  Public
exports.getSubjects = asyncHandler(async (req, res) => {
  const subjects = await Subject.find();
  res.status(200).json({ data: subjects });
});

// @desc    Get subject by ID
// @route   GET /api/v1/subjects/:id
// @access  Public
exports.getSubjectById = asyncHandler(async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  if (!subject) {
    res.status(404).json({ message: 'Subject not found' });
  } else {
    res.status(200).json({ data: subject });
  }
});

// @desc    Create a new subject
// @route   POST /api/v1/subjects
// @access  Private
exports.createSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.create(req.body);
  res.status(201).json({ data: subject });
});

// @desc    Update a subject
// @route   PUT /api/v1/subjects/:id
// @access  Private
exports.updateSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!subject) {
    res.status(404).json({ message: 'Subject not found' });
  } else {
    res.status(200).json({ data: subject });
  }
});

// @desc    Delete a subject
// @route   DELETE /api/v1/subjects/:id
// @access  Private
exports.deleteSubject = asyncHandler(async (req, res) => {
  const subject = await Subject.findByIdAndDelete(req.params.id);
  if (!subject) {
    res.status(404).json({ message: 'Subject not found' });
  } else {
    res.status(200).json({ message: 'Subject deleted successfully' });
  }
});


// @desc    Get subjects taught by a teacher
// @route   GET /api/v1/subjects/:teacherId/teachers
// @access  Public
exports.getSubjectsByTeacher = async (req, res) => {
    try {
      const { teacherId } = req.params;
  
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      const teachings = await Teaching.find({ teacher: teacherId });
  
      const subjectIds = teachings.map(teaching => teaching.subject);
  
      const subjects = await Subject.find({ _id: { $in: subjectIds } });
  
      res.status(200).json({ data: subjects });
    } catch (error) {
      console.error('Error retrieving subjects:', error);
      res.status(500).json({ message: 'Error retrieving subjects', error });
    }
  };

  // @desc    Get teachers teaching a certain subject
// @route   GET /api/v1/subjects/:subjectId/teachers
// @access  Public

  exports.getTeachersBySubject = async (req, res) => {
    try {
      const { subjectId } = req.params;
  
      const subject = await Subject.findById(subjectId);
      if (!subject) {
        return res.status(404).json({ message: 'Subject not found' });
      }
  
      const teachings = await Teaching.find({ subject: subjectId });
  
      const teacherIds = teachings.map(teaching => teaching.teacher);
  
      const teachers = await Teacher.find({ _id: { $in: teacherIds } });
  
      res.status(200).json({ data: teachers });
    } catch (error) {
      console.error('Error retrieving teachers:', error);
      res.status(500).json({ message: 'Error retrieving teachers', error });
    }
  };
  
  