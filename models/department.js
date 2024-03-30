const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name : {
        type : String,
        required:[true,'Name is required'],
        unique: [true,'Name must be unique'],
    },
    description : {
        type : String,
        required:[true,'description is required'],
        unique: [true,'description must be unique'],
    },

});

const departmentModel = mongoose.model('Department',departmentSchema);
module.exports=departmentModel;