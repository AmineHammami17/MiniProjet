const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');

// @desc  Get all users
// @route GET  /api/v1/users
// @access Public
exports.getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json({ data: users });
});

// @desc  Get user by ID
// @route GET  /api/v1/users/:id
// @access Public
exports.getUserById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
        res.status(404).json({ msg: 'User not found' });
    } else {
        res.status(200).json({ data: user });
    }
});

// @desc  Create user
// @route POST /api/v1/users
// @access Private
exports.createUser = asyncHandler(async (req, res) => {
    const { name, lastname, email, password, phone, profileImg, CIN, role } = req.body;
    const user = await User.create({ name, lastname, email, password, phone, profileImg, CIN, role });
    res.status(201).json({ data: user });
});

// @desc  Update user
// @route PUT /api/v1/users/:id
// @access Private
exports.updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email, phone, profileImg } = req.body;

    const updateFields = {};
    if (name) updateFields.name = name;
    if (lastname) updateFields.lastname = lastname;
    if (email) updateFields.email = email;
    if (phone) updateFields.phone = phone;
    if (profileImg) updateFields.profileImg = profileImg;

    const user = await User.findByIdAndUpdate(id, updateFields, { new: true });
    if (!user) {
        res.status(404).json({ msg: 'User not found' });
    } else {
        res.status(200).json({ data: user });
    }
});

// @desc  Delete user
// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if (!user) {
        res.status(404).json({ msg: 'User not found' });
    } else {
        res.status(200).json({ msg: 'User deleted successfully' });
    }
});

// @desc  Update user password
// @route PUT  /api/v1/users/:id
// @access private

exports.updatePassword = asyncHandler(async(req,res)=>{
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, {password: await bcrypt.hash(req.body.password,10)}, { new: true });
    if (!user) {
        res.status(404).json({ msg: 'User not found' });
    } else {
        res.status(200).json({ data: user });
    }


});
