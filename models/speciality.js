const mongoose = require('mongoose');

const specialitySchema = new mongoose.Schema({
    name : {
        type : String,
        required:[true,'Name is required'],
        unique: [true,'Name must be unique'],
    },
    abbreviation : {
        type : String,
        required:[true,'abbreviation is required'],
        unique: [true,'abbreviation must be unique'],
    },
    department : {
        type: mongoose.Schema.ObjectId,
        ref: 'Department',
        required:[true,'Speciality must belong to a department'],
    }

});

const specialityModel = mongoose.model('Speciality',specialitySchema);
module.exports=specialityModel;