const { body, param } = require('express-validator');

exports.updateTeacherValidator = [
  body('department').notEmpty().withMessage('Department is required'),
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('user').notEmpty().withMessage('User is required'),
];

exports.teacherIdValidator = [
  param('id').isMongoId().withMessage('Invalid teacher ID'),
];
