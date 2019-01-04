const bcrypt = require('bcrypt');
const config = require('config');
const Joi = require('joi');
const { User } = require('../model/user');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose'); 
const express = require('express');

const router = express.Router();

router.post('/', async (req, res) =>{
    const {error} = validate(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }

    let user = await User.findOne({email: req.body.email});
    if(!user){
        return res.status(400).send("Invalid username or password...");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(400).send("Invalid username or password...");
    }

    const token = user.generateAuthToken();
    res.send(token);
});

function validate(req){
    const schema = {
        email: Joi.string().required().min(5).max(255).email(),
        password: Joi.string().required().min(5).max(255)
    };

    return Joi.validate(req, schema);
}

module.exports = router;