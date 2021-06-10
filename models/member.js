const mongoose = require('mongoose');
const data = require('../data');
//console.log(data.selections);

const memberSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    postcode: {
        type: String,
        required: true
    },
    emergencyContact: {
        type: String,
        required: true
    },
    emergencyNumber: {
        type: String,
        required: true
    },
    ethnicity: {
        type: String,
        required: true,
        enum: data.selections.ethnicities
    },
    gender: {
        type: String,
        required: true,
        enum: data.selections.genders
    },
    language: {
        type: String,
        required: true,
        enum: data.selections.languages
    },
    religion: {
        type: String,
        required: true,
        enum: data.selections.religions
    },
    school: {
        type: String,
        required: true,
        enum: data.selections.schools
    },
    medical: {
        type: String,
    },
    diet: {
        type: String
    },
    lastVisit: {
        type: Date
    },
    dateJoined: {
        type: Date
    }
})

memberSchema.virtual('fullName')
    .get(function() {
        return `${this.firstName} ${this.lastName}`
    })

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;