const express = require('express');
const router = express.Router();
const {
    getTeachers,
    getTeacherById,
    createTeacher,
    updateTeacher,
    deleteTeacher
} = require('../services/teacherService');

const {
    updateTeacherValidator,
    teacherIdValidator
} = require('../utils/validators/teacherValidator');

router.route('/')
    .get(getTeachers)
    .post(createTeacher);

router.route('/:id')
    .get(teacherIdValidator, getTeacherById)
    .put(teacherIdValidator, updateTeacherValidator, updateTeacher)
    .delete(teacherIdValidator, deleteTeacher);

module.exports = router;
