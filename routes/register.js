const express = require('express');
const router = express.Router();
const utils = require('../processes');
const db = require('../data');
const mongoose = require('mongoose');
const Member = require('../models/member');
const Attendance = require('../models/attendance');


router.get('/', (req, res) => {
    const { qty } = req.query;
    const { selections } = db;
    //console.log(selections);
    //const qty = 'one';
    res.render('form', { qty, selections });
})

// add one of household
router.post('/', async (req, res) => {
    const { member } = req.body;
    const newMember = new Member({
        firstName: member.firstName,
        lastName: member.lastName,
        dob: new Date(member.doby, member.dobm - 1, member.dobd),
        address: member.address,
        postcode: member.postcode.toUpperCase(),
        emergencyContact: member.contactName,
        emergencyNumber: member.contactNumber,
        ethnicity: member.ethnicity,
        gender: member.gender,
        language: member.language,
        religion: member.religion,
        school: member.school,
        dateJoined: new Date(),
        lastVisit: new Date()
    })
    if (member.medical) newMember.medical = member.medical;
    if (member.diet) newMember.diet = member.diet;
    const memberAdded = await newMember.save();
    const attendance = new Attendance({
        member: memberAdded._id,
        datetime: new Date()
    })
    await attendance.save();
    res.send('SUCCESS');
})

// add one and signin
router.put('/', utils.validateMember, async (req, res) => {
    const { member } = req.body;
    const newMember = new Member({
        firstName: member.firstName,
        lastName: member.lastName,
        dob: new Date(member.doby, member.dobm - 1, member.dobd),
        address: member.address,
        postcode: member.postcode.toUpperCase(),
        emergencyContact: member.contactName,
        emergencyNumber: member.contactNumber,
        ethnicity: member.ethnicity,
        gender: member.gender,
        language: member.language,
        religion: member.religion,
        school: member.school,
        dateJoined: new Date(),
        lastVisit: new Date()
    })
    if (member.medical) newMember.medical = member.medical;
    if (member.diet) newMember.diet = member.diet;
    const memberAdded = await newMember.save();
    const attendance = new Attendance({
        member: memberAdded._id,
        datetime: new Date()
    })
    await attendance.save();
    res.redirect('/');
})

module.exports = router;