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

const data = {
    addToRegister: addToRegister,
}

module.exports = data;