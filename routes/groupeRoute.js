const express = require('express');
const {
    getGroupes,
    getGroupeById,
    createGroupe,
    updateGroupe,
    deleteGroupe,
    getGroupsByLevelId
} = require('../services/groupeService');

const {
    createGroupeValidator,
    updateGroupeValidator,
    deleteGroupeValidator
} = require('../utils/validators/groupValidator');

const router = express.Router();

router.route('/')
    .get(getGroupes)
    .post(createGroupeValidator, createGroupe);

router.route('/:id')
    .get(getGroupeById)
    .put(updateGroupeValidator, updateGroupe)
    .delete(deleteGroupeValidator, deleteGroupe);

router.get('/levels/:levelId/groups', getGroupsByLevelId);


module.exports = router;
