const db = require('./data');
const mongoose = require('mongoose');
const Member = require('./models/member');
const Attendance = require('./models/attendance');

mongoose.connect('mongodb://localhost:27017/registerApp', {useNewUrlParser: true, 
                                                                useUnifiedTopology: true})
            .then(() => {
                console.log('MONGO PROCESSES CONNECTION OPEN!!!');
            })
            .catch(err => {
                console.log('OH NO MONGO CONNECTION ERROR!!!');
                console.log(err);
            })

const findMember = async (id) => {
    console.log('finding member!!')
    const result = await Member.findByIdAndUpdate(id, {lastVisit: new Date()});
    //console.log(result)
    return result;
}

const addToRegister = (id) => {
    return new Promise((resolve, reject) => {
        const member = findMember(id);
        console.log('found Mmeber1!')
        console.log(member.__id)
        if (member === undefined) reject('Person Not Found');
        const a = new Attendance({
            member: id,
            datetime: new Date()
        })
        console.log(a);
        a.save();
        resolve('Data added');
    })
}

const validateMember = (req, res, next) => {
    const { member } = req.body;
    const daysInMonth = (month, year = new Date().getFullYear()) => {
        return new Date(year, month, 0).getDate();
    }
    const postcodeRegex = /^(([gG][iI][rR] {0,}0[aA]{2})|((([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y]?[0-9][0-9]?)|(([a-pr-uwyzA-PR-UWYZ][0-9][a-hjkstuwA-HJKSTUW])|([a-pr-uwyzA-PR-UWYZ][a-hk-yA-HK-Y][0-9][abehmnprv-yABEHMNPRV-Y]))) {0,}[0-9][abd-hjlnp-uw-zABD-HJLNP-UW-Z]{2}))$/;
    
    // check first name is not empty
    if(member.firstName === '') console.log('ERROR fName');

    // check last name is not empty
    if(member.lastName === '') console.log('ERROR lName');

    // check dob is a date
    const d = parseInt(member.dobd);
    const m = parseInt(member.dobm);
    const y = parseInt(member.doby);

    if (d > daysInMonth(m, y) || d < 1) console.log('ERROR wrong days');
    if (m > 12 || m < 1) console.log('ERROR month');

    // check address is not empty
    if(member.address === '') console.log('ERROR address');

    // check postcode regex
    if (!postcodeRegex.test(member.postcode)) console.log('ERROR postcode');

    // check contact is not empty
    if (member.contactName === '') console.log('ERROR contactName');

    // check phone is length of 11, and only numbers
    if (member.contactNumber.length !== 11) console.log('ERROR contact#');

    // check ehtinicity is in ethnincities
    if (db.selections.ethnicities.indexOf(member.ethnicity) < 0) console.log('ERROR ethnicities');

    // check gender is in genders
    if (db.selections.genders.indexOf(member.gender) < 0) console.log('ERROR GENDER');

    // check laanguage in languages
    if (db.selections.languages.indexOf(member.language) < 0) console.log('ERROR lang');

    // check school in schools
    if (db.selections.schools.indexOf(member.school) < 0) console.log('ERROR school');

    next();
}

const data = {
    addToRegister,
    validateMember
}

module.exports = data;