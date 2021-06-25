const express = require('express');
const port = 3000;
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const db = require('./data');
const utils = require('./processes');
const Member = require('./models/member');
const Attendance = require('./models/attendance');

const register = require('./routes/register');

mongoose.connect('mongodb://localhost:27017/registerApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch(err => {
        console.log('OH NO MONGO CONNECTION ERROR!!!');
        console.log(err);
    })

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(methodOverride('_method')) // query string to search for

//app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(express.static('public'));
app.set('public', path.join(__dirname, '/public'));

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use('/register', register);

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/selections', (req, res) => {
    const { selections } = db;
    res.send(selections);
})

app.post('/signin', (req, res) => {
    const { id } = req.body;
    console.log(id);
    utils.addToRegister(id)
        .then(resolve => {
            console.log(resolve);
            //console.log(db.attendance);
            res.send('SUCCESS!')
        }, err => {
            console.log(err);
            res.send(Error);
        });
})

app.get('/search', (req, res) => {
    res.render('search');
})

app.get('/signin', async (req, res) => {
    const { name, postcode } = req.query;
    const allNames = name.split(' ');
    const firstName = allNames[0];
    const lastName = allNames[allNames.length - 1];
    let results;
    if (!name) {
        results = await Member.find({ postcode: { $regex: `.*${postcode}.*`, $options: 'i' } });
    }
    else if (!postcode) {
        results = await Member.find({
            $or: [{ firstName: { $regex: `.*${firstName}.*`, $options: 'i' } },
            { lastName: { $regex: `.*${lastName}.*`, $options: 'i' } }]
        });
    }
    else {
        results = await Member.find({ $and: [{ $or: [{ firstName: { $regex: `.*${firstName}.*`, $options: 'i' } },
        { lastName: { $regex: `.*${lastName}.*`, $options: 'i' } }]}, { postcode: { $regex: `.*${postcode}.*`, $options: 'i' } }]});
    }
    let matches = [];
    let inOneHour = new Date();

    for (let person of results) {
        let signedIn = false;
        let visitTime = new Date(person.lastVisit);

        const timeDiff = (inOneHour - visitTime) / (60 * 60 * 1000);
        if (timeDiff >= 1) signedIn = true;
        //signedIn = true;

        const id = `${person._id}`;

        const firstName = person.firstName;
        const lastName = person.lastName;
        const postcode = `${person.postcode.slice(0, -3)} &bullet;&bullet;${person.postcode.slice(-1)}`;
        let emergencyNumber = person.emergencyNumber;
        if (emergencyNumber) emergencyNumber = `${emergencyNumber.slice(0, 2)}&bullet;&bullet;&bullet; &bullet;&bullet;&bullet; ${emergencyNumber.slice(-3)}`;
        if (!emergencyNumber) emergencyNumber = '';

        matches.push({ id, firstName, lastName, postcode, emergencyNumber, signedIn });
    }

    res.render('signin', { matches });
})

app.listen(port, () => {
    console.log('LISTENING ON PORT 3000');
})