const { body, param } = require('express-validator');

exports.noteValidator = [
  body('student').notEmpty().withMessage('Student ID is required'),
  body('subject').notEmpty().withMessage('Subject ID is required'),
  body('noteExamen').notEmpty().withMessage('Examen note is required'),
];

exports.noteIdValidator = [
  param('id').isMongoId().withMessage('Invalid note ID'),
];
