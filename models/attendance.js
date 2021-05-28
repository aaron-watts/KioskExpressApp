const mongoose = require('mongoose');
const { attendance } = require('../data');

const attendanceSchema = new mongoose.Schema({
    member: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true
    }
})

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;