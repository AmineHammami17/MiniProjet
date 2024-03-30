const departmentModel = require('../models/department');
const asyncHandler = require('express-async-handler');


// @desc  Get list of departments
// @route GET  /api/v1/departments
// @acess Public
exports.getDepartments = asyncHandler(async(req,res)=>{
    const departments = await departmentModel.find({});
    res.status(200).json({data:departments });

});


// @desc  Get list of departments
// @route GET  /api/v1/departments/id
// @acess Public

exports.getDepartmentById = asyncHandler(async(req,res)=>{

    const {id} = req.params;
    const department = await departmentModel.findById(id);
    if(!department){
        res.status(404).json({msg:'No department found with the id : ',id})
    }
        res.status(200).json({data:department});

});




// @desc  Create Department
// @route POST /api/v1/departments
// @acess Private
exports.createDepartment= asyncHandler(async (req,res) => {
    const name = req.body.name;
    const description = req.body.description;
    const department = await departmentModel.create({name,description});
    res.status(201).json({data : department});    
});


// @desc  Update Department
// @route PUT /api/v1/departments/id
// @acess Private

exports.updateDepartment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body; 

    if (!name && !description) {
        return res.status(400).json({ error: "Name or description must be provided for update" });
    }
    const updateFields = {};
    if (name) {
        updateFields.name = name;
    }
    if (description) {
        updateFields.description = description;
    }
    const department = await departmentModel.findOneAndUpdate(
        { _id: id }, 
        updateFields, 
        { new: true });
    if (!department) {
        return res.status(404).json({ error: "Department not found" });
    }

    res.status(200).json({ data: department });
});

// @desc  Delete Department
// @route Delete /api/v1/departments/id
// @acess Private

exports.deleteDepartment = asyncHandler(async(req,res)=>{
    const { id } = req.params;
    const department = await departmentModel.findByIdAndDelete(id);
    if (!department) {
        return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json("Deleted Successfully");



});