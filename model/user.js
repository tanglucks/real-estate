const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 90
    },
    email: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 255,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 18
    },
    password: {
        type: String,
        required: true,
        minLength: 255,
        maxLength: 1024
    }
});

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id}, config.get('jwtPrivateKey'));
    return token;
}

const User = mongoose.model('user', userSchema);

function validateUser(user){
    const schema = {
        name: Joi.string().required().min(5).max(90),
        email: Joi.string().required().min(5).max(255).email(),
        phone: Joi.string().required().min(9).max(18),
        password: Joi.string().required().min(5).max(255)
    };

    return Joi.validate(user, schema);
}

module.exports.validate = validateUser;
module.exports.User = User;