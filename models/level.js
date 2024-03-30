const mongoose = require('mongoose');

const levelSchema = new mongoose.Schema({
    name : {
        type : String,
        required:[true,'Name is required'],
        unique: [true,'Name must be unique'],
    },
    speciality : {
        type: mongoose.Schema.ObjectId,
        ref: 'Speciality',
        required:[true,'Level must belong to a Speciality'],
    }

});

const levelModel = mongoose.model('Level',levelSchema);
module.exports=levelModel;