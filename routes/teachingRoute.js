const express = require('express');
const router = express.Router();
const teachingController = require('../services/teachingService');

router.route('/').get(teachingController.getTeachings).post(teachingController.createTeaching);
router.route('/:id').get(teachingController.getTeachingById).put(teachingController.updateTeaching).delete(teachingController.deleteTeaching);

module.exports = router;
