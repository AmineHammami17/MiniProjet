const Speciality = require('../models/speciality');
const asyncHandler = require('express-async-handler');

// @desc  Get list of specialities
// @route GET  /api/v1/specialities
// @access Public
exports.getSpecialities = asyncHandler(async(req,res)=>{
    const specialities = await Speciality.find({}).populate({path:'department',select:'name -_id'});
    res.status(200).json({data: specialities});
});

// @desc  Get speciality by ID
// @route GET  /api/v1/specialities/:id
// @access Public
exports.getSpecialityById = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const speciality = await Speciality.findById(id).populate({path:'department',select:'name -_id'});
    if (!speciality) {
        res.status(404).json({msg: 'Speciality not found'});
    } else {
        res.status(200).json({data: speciality});
    }
});

// @desc  Create speciality
// @route POST /api/v1/specialities
// @access Private
exports.createSpeciality = asyncHandler(async(req,res)=>{
    const { name, abbreviation, department } = req.body;
    const speciality = await Speciality.create({ name, abbreviation, department });
    res.status(201).json({data: speciality});
});

// @desc  Update speciality
// @route PUT /api/v1/specialities/:id
// @access Private
exports.updateSpeciality = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const { name, abbreviation, department } = req.body;
    
    const updateFields = {};
    if (name) updateFields.name = name;
    if (abbreviation) updateFields.abbreviation = abbreviation;
    if (department) updateFields.department = department;

    const speciality = await Speciality.findByIdAndUpdate(id, updateFields, { new: true });
    if (!speciality) {
        res.status(404).json({msg: 'Speciality not found'});
    } else {
        res.status(200).json({data: speciality});
    }
});

// @desc  Delete speciality
// @route DELETE /api/v1/specialities/:id
// @access Private
exports.deleteSpeciality = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const speciality = await Speciality.findByIdAndDelete(id);
    if (!speciality) {
        res.status(404).json({msg: 'Speciality not found'});
    } else {
        res.status(200).json({msg: 'Speciality deleted successfully'});
    }
});
