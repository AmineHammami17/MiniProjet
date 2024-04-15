const express = require('express');
const router = express.Router();
const {
  getSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
  getSubjectsByTeacher,
  getTeachersBySubject 

} = require('../services/subjectService');

router.route('/').get(getSubjects).post(createSubject);
router.route('/:id').get(getSubjectById).put(updateSubject).delete(deleteSubject);
router.route('/:teacherId/teachers').get(getSubjectsByTeacher);
router.route('/:subjectId/teachers').get(getTeachersBySubject);

module.exports = router;
