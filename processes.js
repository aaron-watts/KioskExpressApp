const db = require('./data');

const addToRegister = (id) => {
    return new Promise((resolve, reject) => {
        if (db.people[id] === undefined) reject('Person Not Found');
        db.attendance[id] = {time:new Date(), id:id}
        resolve('Data added');
    })
}

const data = {
    addToRegister: addToRegister,
}

module.exports = data;