const express = require('express');
const {
    getSpecialities,
    getSpecialityById,
    createSpeciality,
    updateSpeciality,
    deleteSpeciality
} = require('../services/specialityService');
const {
    getSpecialityByIdValidator,
    createSpecialityValidator,
    updateSpecialityValidator,
    deleteSpecialityValidator
} = require('../utils/validators/specialityValidator');

const router = express.Router();

router.route('/')
    .get(getSpecialities)
    .post(createSpecialityValidator, createSpeciality);

router.route('/:id')
    .get(getSpecialityByIdValidator, getSpecialityById)
    .put(updateSpecialityValidator, updateSpeciality)
    .delete(deleteSpecialityValidator, deleteSpeciality);

module.exports = router;
