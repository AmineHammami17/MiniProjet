const { check } = require('express-validator');
const validatorMiddleware = require('../../middlewares/validatorMiddleware');

exports.createGroupeValidator = [
    check('number').notEmpty().withMessage('Group number is required'),
    check('level').notEmpty().withMessage('Level ID is required'),
    validatorMiddleware // Assuming you have a middleware for handling validation errors
];

exports.updateGroupeValidator = [
    check('number').optional().notEmpty().withMessage('Group number is required'),
    check('level').optional().notEmpty().withMessage('Level ID is required'),
    validatorMiddleware // Assuming you have a middleware for handling validation errors
];

exports.deleteGroupeValidator = [
    check('id').notEmpty().withMessage('Group ID is required'),
    validatorMiddleware // Assuming you have a middleware for handling validation errors
];
