const { check } = require("express-validator");
const validatorMiddleware = require("../../middlewares/validatorMiddleware");
const User = require('../../models/user');
const bcrypt = require('bcryptjs');

exports.signupValidator = [
    check("name").notEmpty().withMessage("Name is required"),
    check("lastname").notEmpty().withMessage("Lastname is required"),
    check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format").custom((val)=> User.findOne({email:val}).then((user)=>{
        if(user){
            return Promise.reject(new Error("Email already in use"));
        }
    })),
    check("password").notEmpty().withMessage("Password is required").isLength({min:8}).withMessage('Password must be at least 8 characters'),
    check("phone").optional().isMobilePhone("ar-TN").withMessage("Invalid phone number should be +216......"),
    check("CIN").notEmpty().withMessage("CIN is required"),
    check("role").notEmpty().withMessage("Role is required").isIn(['student', 'teacher', "superadmin", "managerhr", "manageruni", "managerdocuments"]).withMessage("Invalid role"),
    validatorMiddleware
];


exports.loginValidator =[
    check("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email format"),
    check("password").notEmpty().withMessage("Password is required").isLength({min:8}).withMessage('Password must be at least 8 characters'),


]