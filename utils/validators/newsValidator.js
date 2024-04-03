const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createNewsValidator = [
  check('title').notEmpty().withMessage('Title is required'),
  check('details').notEmpty().withMessage('Details are required'),
  check('date').notEmpty().withMessage('Date is required'),
  validatorMiddleware
];

exports.updateNewsValidator = [
  check('title').optional().notEmpty().withMessage('Title is required'),
  check('details').optional().notEmpty().withMessage('Details are required'),
  check('date').optional().notEmpty().withMessage('Date is required'),
  validatorMiddleware
];

exports.deleteNewsValidator = [
  check('id').isMongoId().withMessage('Invalid news ID format'),
  validatorMiddleware
];
