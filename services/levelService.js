const asyncHandler = require('express-async-handler');
const Level = require('../models/Level');


// @desc  Get list of levels
// @route GET  /api/v1/levels
// @access Public
exports.getLevels = asyncHandler(async(req,res)=>{
    const levels = await Level.find({}).populate({ path: 'speciality', select: 'name -_id' });
    res.status(200).json({ data: levels });
});

// @desc  Get level by ID
// @route GET  /api/v1/levels/:id
// @access Public
exports.getLevelById = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const level = await Level.findById(id).populate({ path: 'speciality', select: 'name -_id' });
    if (!level) {
        res.status(404).json({ msg: 'Level not found' });
    } else {
        res.status(200).json({ data: level });
    }
});

// @desc  Create level
// @route POST /api/v1/levels
// @access Private
exports.createLevel = asyncHandler(async(req,res)=>{
    const { name, speciality } = req.body;
    const level = await Level.create({ name, speciality });
    res.status(201).json({ data: level });
});

// @desc  Update level
// @route PUT /api/v1/levels/:id
// @access Private
exports.updateLevel = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const { name, speciality } = req.body;
    
    const updateFields = {};
    if (name) updateFields.name = name;
    if (speciality) updateFields.speciality = speciality;

    const level = await Level.findByIdAndUpdate(id, updateFields, { new: true });
    if (!level) {
        res.status(404).json({ msg: 'Level not found' });
    } else {
        res.status(200).json({ data: level });
    }
});

// @desc  Delete level
// @route DELETE /api/v1/levels/:id
// @access Private
exports.deleteLevel = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const level = await Level.findByIdAndDelete(id);
    if (!level) {
        res.status(404).json({ msg: 'Level not found' });
    } else {
        res.status(200).json({ msg: 'Level deleted successfully' });
    }
});


// @desc  Get levels by speciality ID
// @route GET /api/v1/levels/specialities/:specialityId
// @access Public
exports.getLevelsBySpecialityId = asyncHandler(async (req, res) => {
    const specialityId = req.params.specialityId;
    const levels = await Level.find({ speciality: specialityId })
        .populate('speciality', 'name');
    res.status(200).json({ data: levels });
});
