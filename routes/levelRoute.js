const express = require('express');
const {
    getLevels,
    getLevelById,
    createLevel,
    updateLevel,
    deleteLevel
} = require('../services/levelService');

const router = express.Router();

router.route('/').get(getLevels).post(createLevel);
router.route('/:id').get(getLevelById).put(updateLevel).delete(deleteLevel);

module.exports = router;
