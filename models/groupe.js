const mongoose = require('mongoose');

const groupeSchema = new mongoose.Schema({
    number : {
        type : String,
        required:[true,'number is required'],
        unique: [true,'number must be unique'],
    },
    level : {
        type: mongoose.Schema.ObjectId,
        ref: 'Level',
        required:[true,'groupe must be attached to a level'],
    }

});

const groupeModel = mongoose.model('Groupe',groupeSchema);
module.exports=groupeModel;