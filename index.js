const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const houses = require('./routes/houses');
const authantication = require('./routes/authantication')
const users = require('./routes/users');
const express = require('express');
const app = express();

if(!config.get("jwtPrivateKey")){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.');
    process.exit(1);
}

mongoose.connect('mongodb://localhost/CamRent')
    .then(() => console.log('Connection successfull...'))
    .catch(error => console.error(error.message));

app.use(express.json());
app.use(cors());
app.use('/api/users', users);
app.use('/api/auth', authantication);
app.use('/api/houses', houses);

app.listen(80, () => console.log('Listening on port 80...'));
