const Joi = require('joi');
const mongoose = require('mongoose');

const houseSchema = mongoose.Schema({
    town: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 20
    },
    description: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 512
    },
    location: {
        type: String,
        required: true,
        minLength: 20,
        maxLength: 255
    },
    isAvailable: {
        type: Boolean,
        required: true
    }
});

const House = mongoose.model('house', houseSchema);

function validateHouse(house){
    const schema = {
        town: Joi.string().required().min(3).max(20),
        description: Joi.string().required().min(20).max(512),
        location: Joi.string().required().min(20).max(255),
        isAvailable: Joi.boolean().required()
    };

    return Joi.validate(house, schema);
}

module.exports.House = House;
module.exports.validate = validateHouse;