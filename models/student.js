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
        ref: 'Groupe',
        required: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(userId) {
                const user = await mongoose.model('User').findById(userId);
                return user && user.role === 'student';
            },
            message: 'User must have the role "student"',
        }
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
