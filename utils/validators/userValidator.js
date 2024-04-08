const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require('../../models/user');
const bcrypt = require('bcryptjs');
exports.getUserByIdValidator = [
    check('id').isMongoId().withMessage("Invalid user id format"),
    validatorMiddleware
];

exports.createUserValidator = [
    check("name").notEmpty().withMessage("Name is required"),
    check("lastname").notEmpty().withMessage("Lastname is required"),
    check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format").custom((val)=> User.findOne({email:val}).then((user)=>{
        if(user){
            return Promise.reject(new Error("Email already in use"));
        }
    })),
    check("password").notEmpty().withMessage("Password is required").isLength({min:8}).withMessage('Password must be at least 8 characters'),
    check("phone").optional().isMobilePhone("ar-TN").withMessage("Invalid phone number should be +216......"),
    check("profileImg").optional().isURL().withMessage("Invalid URL format"),
    check("CIN").notEmpty().withMessage("CIN is required"),
    check("role").notEmpty().withMessage("Role is required").isIn(['student', 'teacher', "superadmin", "managerhr", "manageruni", "managerdocuments"]).withMessage("Invalid role"),
    validatorMiddleware
];

exports.updateUserValidator = [
    check('id').isMongoId().withMessage("Invalid user id format"),
    check("name").optional(),
    check("lastname").optional(),
    check("email").optional().isEmail().withMessage("Invalid email format").custom((val)=> User.findOne({email:val}).then((user)=>{
        if(user){
            return Promise.reject(new Error("Email already in use"));
        }
    })),
    check("phone").optional().isMobilePhone().withMessage("Invalid phone number format"),
    check("profileImg").optional().isURL().withMessage("Invalid URL format"),
    validatorMiddleware
];

exports.updateUserPasswordValidator =[
    check('id').isMongoId().withMessage("Invalid user id format"),
    check("currentPassword").notEmpty().withMessage("You must enter your current password"),
    check("passwordConfirm").notEmpty().withMessage("You must confirm your password"),
    check("password").notEmpty().withMessage("You must enter new. password").custom(async (val,{req})=>{
        const user = await User.findById(req.params.id);
        if(!user){
            throw new Error("user doesn't exist for this id ");
        }
        const isCorrectPassword = await bcrypt.compare(
            req.body.currentPassword,user.password 
        );
        if(!isCorrectPassword){
            throw new Error('Verify your current password');
        }
        if(val !== req.body.passwordConfirm){
            throw new Error("You entered different passwords");
        }
        return true;

    }),
    validatorMiddleware
]