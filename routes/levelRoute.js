const express = require('express');
const {
    getLevels,
    getLevelById,
    createLevel,
    updateLevel,
    deleteLevel,
    getLevelsBySpecialityId 
} = require('../services/levelService');

const router = express.Router();

router.route('/').get(getLevels).post(createLevel);
router.route('/:id').get(getLevelById).put(updateLevel).delete(deleteLevel);
router.get('/specialities/:specialityId/levels', getLevelsBySpecialityId);

module.exports = router;
