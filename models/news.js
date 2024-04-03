const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    details: {
        type: String,
        required: [true, 'Details are required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    image: String
});

const newsModel = mongoose.model('News', newsSchema);

module.exports = newsModel;
