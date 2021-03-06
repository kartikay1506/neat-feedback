const mongoose = require('mongoose');

const StudentResponseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    college: {
        type: String,
        required: true
    },
    admission_no: {
        type: String,
        required: true
    },
    product: {
        type: String,
        required: true
    },
    bucket: {
        type: String,
        required: true
    },
    answer1: {
        type: String,
        required: true
    },
    answer2: {
        type: String,
        required: true
    },
    answer3: {
        type: String,
        required: true
    },
    answer4: {
        type: String,
        required: true
    },
    answer5: {
        type: String,
        required: true
    },
    answer6: {
        type: String,
        required: true
    },
    answer7: {
        type: String,
        required: true
    },
    answer8: {
        type: String,
        required: true
    },
    average: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const StudentResponse = mongoose.model('StudentResponse', StudentResponseSchema);
module.exports = StudentResponse;