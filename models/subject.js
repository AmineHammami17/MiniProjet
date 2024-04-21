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
    TeachingUnit: {
        required: [true, 'Teaching unit is required'],
        type: String
    },
    credits: {
        type: Number,
        required: [true, 'Credits is required']
    },
    coefficient: {
        type: Number,
        required: [true, 'Coefficient is required']
    },
    TPHours: {
        type: Number,
        default: 0
    },
    CoursHours: {
        type: Number,
        default: 0
    },
    TDHours: {
        type: Number,
        default: 0
    }
});

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject;