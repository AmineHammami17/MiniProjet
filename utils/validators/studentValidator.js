const { body, param } = require('express-validator');


exports.updateStudentValidator = [
  body('UniversitySituation').optional().notEmpty().withMessage('University situation is required'),
  body('internships').optional().isArray().withMessage('Internships must be an array'),
  body('speciality').optional().notEmpty().withMessage('Speciality is required'),
  body('level').optional().notEmpty().withMessage('Level is required'),
  body('group').optional().notEmpty().withMessage('Group is required'),
  body('user').optional().notEmpty().withMessage('User is required'),
];

exports.studentIdValidator = [
  param('id').isMongoId().withMessage('Invalid student ID'),
];
