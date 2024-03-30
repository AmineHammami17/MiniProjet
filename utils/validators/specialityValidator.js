const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.getSpecialityByIdValidator = [
    check('id').isMongoId().withMessage('Invalid speciality id format'),
    validatorMiddleware
];

exports.createSpecialityValidator = [
    check('name').notEmpty().withMessage('Name is required'),
    check('abbreviation').notEmpty().withMessage('Abbreviation is required'),
    check('department').isMongoId().withMessage('Invalid department id format'),
    validatorMiddleware
];

exports.updateSpecialityValidator = [
    check('id').isMongoId().withMessage('Invalid speciality id format'),
    check('department').optional().isMongoId().withMessage('Invalid department id format'),
    validatorMiddleware
];

exports.deleteSpecialityValidator = [
    check('id').isMongoId().withMessage('Invalid speciality id format'),
    validatorMiddleware
];
