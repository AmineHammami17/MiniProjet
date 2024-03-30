const {check} = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");

exports.getDepartmentByIdValidator = [
    check('id').isMongoId().withMessage("Invalid department id format"),
    validatorMiddleware
];


exports.createDepartmentValidator = [
    check("name").notEmpty().withMessage("Name required"),
    check("description").notEmpty().withMessage("Description required"),
    validatorMiddleware
];


exports.deleteDepartmentValidator=[
    check('id').isMongoId().withMessage("Invalid department id format"),
    validatorMiddleware
];

exports.updateDepratmentValidator=[
    check('id').isMongoId().withMessage("Invalid department id format"),
    validatorMiddleware
];