const Note = require('../models/Note');
const asyncHandler = require('express-async-handler');

// @desc    Get all notes
// @route   GET /api/v1/notes
// @access  Public
exports.getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
  res.status(200).json({ data: notes });
});

// @desc    Get note by ID
// @route   GET /api/v1/notes/:id
// @access  Public
exports.getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) {
    res.status(404).json({ message: 'Note not found' });
  } else {
    res.status(200).json({ data: note });
  }
});

// @desc    Create a new note
// @route   POST /api/v1/notes
// @access  Private
exports.createNote = asyncHandler(async (req, res) => {
  const note = await Note.create(req.body);
  res.status(201).json({ data: note });
});

// @desc    Update a note
// @route   PUT /api/v1/notes/:id
// @access  Private
exports.updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!note) {
    res.status(404).json({ message: 'Note not found' });
  } else {
    res.status(200).json({ data: note });
  }
});

// @desc    Delete a note
// @route   DELETE /api/v1/notes/:id
// @access  Private
exports.deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findByIdAndDelete(req.params.id);
  if (!note) {
    res.status(404).json({ message: 'Note not found' });
  } else {
    res.status(200).json({ message: 'Note deleted successfully' });
  }
});


// @desc    Get notes for a certain student
// @route   DELETE /api/v1/notes/student/:studentid
// @access  Private

exports.getNotesForStudent = async (req, res) => {
    try {
      const { studentId } = req.params;
  
      const notes = await Note.find({ student: studentId });
  
      res.status(200).json({ data: notes });
    } catch (error) {
      console.error('Error retrieving notes:', error);
      res.status(500).json({ message: 'Error retrieving notes', error });
    }
  };
  
