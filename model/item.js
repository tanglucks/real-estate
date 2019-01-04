const Joi = require('joi');
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String
});