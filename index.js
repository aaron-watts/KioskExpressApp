const express = require('express');
const port = 3000;
const app = express();
const path = require('path');
const { attendance } = require('./data');

const db = require('./data');
const utils = require('./processes');


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.static('public'));
app.set('public', path.join(__dirname, '/public'));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/register', (req, res) => {
    const { selections } = db;
    //console.log(selections);
    const qty = 'one';
    res.render('form', { qty, selections });
})

app.get('/register/many', (req,res) => {
    const { ethnicities, genders, languages } = db;
    const quantity = 'many';
    res.render('form', { qty, ethnicity, gender });
})

app.get('/selections', (req,res) => {
    const { selections } = db;
    res.send(selections);
})

app.post('/signin', (req,res) => {
    const { id } = req.body;
    console.log(id);
    utils.addToRegister(id)
        .then(resolve => {
            console.log(resolve);
            console.log(db.attendance);
            res.send('SUCCESS');
        }, err => {
            console.log(err);
            res.send(error);
        });
})

app.get('/checkin', (req, res) => {
    res.render('tasks');
})

app.post('/checkin', (req, res) => {
    const { name, postcode } = req.body;
    console.log(req.body);
    const matches = [];

    for (let person in db.people) {
        const fullName = `${db.people[person].firstName.toLowerCase()} ${db.people[person].lastName.toLowerCase()}`;
        if (db.people[person].postcode.includes(postcode.toUpperCase()) && fullName.includes(name.toLowerCase())) {
            const id = person;
            const firstName = db.people[person].firstName;
            const lastName = db.people[person].lastName;
            const postcode = `${db.people[person].postcode.slice(0,-3)} &bullet;&bullet;${db.people[person].postcode.slice(-1)}`;
            let phone = db.people[person].phone;
            if (phone) phone = `${phone.slice(0,2)}&bullet;&bullet;&bullet; &bullet;&bullet;&bullet; ${phone.slice(-3)}`;
            if (!phone) phone = '';
            matches.push({id, firstName, lastName, postcode, phone });
        };
    }

    // CHANGE/REFINE MATCHES - don't send ALL UNCENSORED information to page!!! BAD!!!
    res.render('show', { matches });
})

app.listen(port, () => {
    console.log('LISTENING ON PORT 3000');
})