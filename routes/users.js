const {User, validate} = require('../model/user');
const _ = require('lodash');
const auth = require('../middleWare/auth');
const bcrypt = require('bcrypt');
const express = require('express');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
   
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User already registered...');

    user = new User(_.pick(req.body, ['name', 'email', 'password', 'phone']));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    try{
        await user.save();
        const token = user.generateAuthToken();
        res.header('x-auth-token', token).send(_.pick(user, ['_id']));
    } catch(ex){
        res.send(ex.message);
    }   
});

module.exports = router;