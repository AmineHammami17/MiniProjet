const express = require('express');
const { createUserValidator, updateUserValidator ,getUserByIdValidator , updateUserPasswordValidator} = require("../utils/validators/userValidator");
const { getUsers, getUserById, createUser, updateUser, deleteUser ,updatePassword} = require('../services/userService');

const router = express.Router();

router.route('/').get(getUsers).post(createUserValidator, createUser);
router.route('/:id').get(getUserByIdValidator,getUserById).put(updateUserValidator, updateUser).delete(deleteUser);
router.put('/changepassword/:id',updateUserPasswordValidator,updatePassword);
module.exports = router;
