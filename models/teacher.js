const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        validate: {
            validator: async function(userId) {
                const user = await mongoose.model('User').findById(userId);
                return user && user.role === 'teacher';
            },
            message: 'User must have the role "teacher"',
        }
    },
    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Department',
        required: true,
    },
    title: String,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
