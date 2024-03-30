const express = require('express');
const {
    getGroupes,
    getGroupeById,
    createGroupe,
    updateGroupe,
    deleteGroupe
} = require('../services/groupeService');

const router = express.Router();

router.route('/').get(getGroupes).post(createGroupeValidator, createGroupe);
router.route('/:id').get(getGroupeByIdValidator, getGroupeById)
    .put(updateGroupeValidator, updateGroupe)
    .delete(deleteGroupeValidator, deleteGroupe);

module.exports = router;
