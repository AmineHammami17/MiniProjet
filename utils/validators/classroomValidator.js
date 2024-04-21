const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getClassroomByIdValidator = [
  check('id').isMongoId().withMessage('Invalid classroom id format'),
  validatorMiddleware
];

exports.createClassroomValidator = [
  check('name').notEmpty().withMessage('Name required'),
  validatorMiddleware
];

exports.deleteClassroomValidator = [
  check('id').isMongoId().withMessage('Invalid classroom id format'),
  validatorMiddleware
];

exports.updateClassroomValidator = [
  check('id').isMongoId().withMessage('Invalid classroom id format'),
  check('name').notEmpty().withMessage('Name required'),
  validatorMiddleware
];
