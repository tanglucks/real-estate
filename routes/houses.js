const _ = require('lodash');
const auth = require('../middleWare/auth');
const {House, validate} = require('../model/house');
const express = require('express');

const router = express.Router();

router.get('/', async (req, res) => {
    const houses = await House.find().sort('town');
    res.send(houses);
});

router.get('/:id', async (req, res) => {
    const house = await House.findById(req.params.id);
    if(!house) return res.status(404).send('House not found...');

    res.send(house);
});

router.post('/', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const house =new House(_.pick(req.body, ['town', 'description', 'isAvailable', 'location']));

    const result = await house.save();

    res.send(_.pick(result, ['town', 'isAvailable']));
});

router.put('/:id', auth, async (req, res) => {
    const {error} = validate(req.body);
    if(error) res.status(400).send('Invalid request...');
    
    const house = await House.findOneAndUpdate(
        req.params.id, 
        {
            town: req.body.town,
            description: req.body.description,
            location: req.body.location,
            isAvailable: req.body.isAvailable
        },
    {new: true});

    if(!house) return res.status(404).send('House not found...');
    res.send(house);
});

router.delete('/:id', auth, async (req, res) => {
    const house = await House.findByIdAndRemove(req.params.id);
    if(!house) return res.status(404).send('House not found...');

    res.send(house);
});

module.exports = router;