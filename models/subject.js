const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Subject name is required'],
        unique: true
    },
    code: {
        type: String,
        unique: true
    },
    description: {
        type: String
    },

    credits: {
        type: Number,
        required: [true, 'Credits is required']
    },
    coefficient: {
        type: Number,
        required: [true, 'Coefficient is required']
    }


});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;
