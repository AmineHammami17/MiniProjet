const mongoose = require('mongoose');

const teachingSchema = new mongoose.Schema({
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject'
    }
});

const teachingModel = mongoose.model('Teaching', teachingSchema);

module.exports = teachingModel;
