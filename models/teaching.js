const mongoose = require('mongoose');

const teachingSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    },
    type: {
        type: String,
        enum: ['TP', 'TD', 'Cours'],
        required: true
    }
});

const Teaching = mongoose.model('Teaching', teachingSchema);

module.exports = Teaching;
