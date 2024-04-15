const { body, param } = require('express-validator');

exports.subjectIdValidator = [
  param('id').isMongoId().withMessage('Invalid subject ID')
];

exports.createSubjectValidator = [
  body('name').notEmpty().withMessage('Name is required'),
  body('code').optional(),
  body('description').optional(),
  body('credits').notEmpty().withMessage('Credits is required'),
  body('coefficient').notEmpty().withMessage('Coefficient is required')
];

exports.updateSubjectValidator = [
  body('name').optional(),
  body('code').optional(),
  body('description').optional(),
  body('credits').optional(),
  body('coefficient').optional()
];
