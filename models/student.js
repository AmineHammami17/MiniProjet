const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
 
    UniversitySituation: {
        type: String,
    },

    internships: [String],

    speciality: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Speciality',
        required: true,
    },
    level: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Level',
        required: true,
    },
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
