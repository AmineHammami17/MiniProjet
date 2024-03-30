const express = require('express');
const {getDepartmentByIdValidator,createDepartmentValidator,updateDepratmentValidator,deleteDepartmentValidator} = require("../utils/validators/departmentValidator");
const 
{createDepartment,
 getDepartments,
 getDepartmentById,
 updateDepartment,
 deleteDepartment
}= require('../services/departmentService');

const router = express.Router();


router.route('/').post(createDepartmentValidator,createDepartment).get(getDepartments);
router.route('/:id').get(getDepartmentByIdValidator,getDepartmentById).put(updateDepratmentValidator,updateDepartment).delete(deleteDepartmentValidator,deleteDepartment);
module.exports = router;