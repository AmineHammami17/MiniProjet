const Groupe = require('../models/groupe');
const asyncHandler = require('express-async-handler');

exports.getGroupes = asyncHandler(async (req, res) => {
    const groupes = await Groupe.find({});
    res.status(200).json({ data: groupes });
});

exports.getGroupeById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const groupe = await Groupe.findById(id);
    if (!groupe) {
        return res.status(404).json({ msg: 'Groupe not found' });
    }
    res.status(200).json({ data: groupe });
});

exports.createGroupe = asyncHandler(async (req, res) => {
    const { number, level } = req.body;
    const groupe = await Groupe.create({ number, level });
    res.status(201).json({ data: groupe });
});

exports.updateGroupe = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { number, level } = req.body;

    const updateFields = {};
    if (number) updateFields.number = number;
    if (level) updateFields.level = level;

    const groupe = await Groupe.findByIdAndUpdate(id, updateFields, { new: true });
    if (!groupe) {
        return res.status(404).json({ msg: 'Groupe not found' });
    }
    res.status(200).json({ data: groupe });
});

exports.deleteGroupe = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const groupe = await Groupe.findByIdAndDelete(id);
    if (!groupe) {
        return res.status(404).json({ msg: 'Groupe not found' });
    }
    res.status(200).json({ msg: 'Groupe deleted successfully' });
});
