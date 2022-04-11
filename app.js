const mongoose = require('mongoose');
const express = require('express');
const helmet = require('helmet');
const config = require('config');
const app = express();
const home = require('./routes/home');
const donors = require('./routes/donors');
const ambulances = require('./routes/ambulances');
const hospitals = require('./routes/hospitals');
const users = require('./routes/users');
const auth = require('./routes/auth');

if(!config.get('jwtPrivateKey')) {
    //Use set covid_jwtPrivateKey=something
    console.log('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

//For connection to Mongoose
mongoose.connect('mongodb://localhost/covid')
    .then(() => console.log('Connected to MongoDB...'))
    .catch(err => console.log('Could not connect to MongoDB', err));

app.use(express.json());
app.use(helmet());

//Handling routes
app.use('/', home);
app.use('/api/donors', donors);
app.use('/api/ambulances', ambulances);
app.use('/api/hospitals', hospitals);
app.use('/api/users', users);
app.use('/api/auth', auth);

//Deciding port
const port = process.env.port || 3000;

app.listen(port, () => console.log(`Listening on ${port}..`));
