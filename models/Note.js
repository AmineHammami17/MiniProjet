const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student',
        required: true,
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true,
    },
    noteDS: {
        type: Number,
        default: undefined,
    },
    noteExamen: {
        type: Number,
        required: true,
    },
    noteTP: {
        type: Number,
        default: undefined,
    },
    average: {
        type: Number,
        required: true,
    },
});

noteSchema.pre('save', function(next) {
    const { noteDS, noteExamen, noteTP } = this;

    if (noteDS !== undefined) {
        if (noteTP !== undefined) {
            this.average = (noteDS * 0.2) + (noteExamen * 0.6) + (noteTP * 0.2);
        } else {
            this.average = (noteDS * 0.2) + (noteExamen * 0.8);
        }
    } else {
        if (noteTP !== undefined) {
            this.average = (noteExamen * 0.8) + (noteTP * 0.2);
        } else {
            this.average = noteExamen; 
        }
    }

    next();
});

const Note = mongoose.model('Note', noteSchema);
module.exports = Note;
