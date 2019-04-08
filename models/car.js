'use strict'

//importando mongoose, super importante
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//definiendo schema
const CarSchema = new Schema({
    car_plate: {type: String},
    model: {type: Number, default: 0},
    color: {type: String},
    gas:   {type: String, enum: ['Diesel','Extra','Corriente'] },
    id_driverF: {type: String}
})

module.exports = mongoose.model('Car',CarSchema)