const express = require('express');
const router = express.Router();
const { noteValidator, noteIdValidator } = require('../utils/validators/noteValidator');
const {
    getNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote,
    getNotesForStudent 
  } = require('../services/noteService');
  
  router.route('/')
    .get(getNotes)
    .post(noteValidator, createNote);
  
  router.route('/:id')
    .get(noteIdValidator, getNoteById)
    .put([noteIdValidator, noteValidator], updateNote)
    .delete(noteIdValidator, deleteNote);
  
  router.route('/student/:studentId') .get(getNotesForStudent); 
  
  module.exports = router;
  