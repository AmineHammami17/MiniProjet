const express = require('express');
const router = express.Router();
const {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentsByGroup 
} = require('../services/studentService');

router.route('/').get(getStudents).post(createStudent);
router.route('/:id').get(getStudentById).put(updateStudent).delete(deleteStudent);
router.get('/groups/:groupId', getStudentsByGroup);

module.exports = router;
