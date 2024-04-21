const express = require('express');
const router = express.Router();
const {
  getClassrooms,
  getClassroomById,
  createClassroom,
  updateClassroom,
  deleteClassroom
} = require('../services/classroomService');

const {
  getClassroomByIdValidator,
  createClassroomValidator,
  deleteClassroomValidator,
  updateClassroomValidator
} = require('../utils/validators/classroomValidator');

router.route('/')
  .get(getClassrooms)
  .post(createClassroomValidator, createClassroom);

router.route('/:id')
  .get(getClassroomByIdValidator, getClassroomById)
  .put(updateClassroomValidator, updateClassroom)
  .delete(deleteClassroomValidator, deleteClassroom);


module.exports = router;
