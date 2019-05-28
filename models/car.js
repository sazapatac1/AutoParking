'use strict'

//importando mongoose, super importante
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//definiendo schema
const CarSchema = new Schema({
    car_plate: {type: String, default:""},
    model: {type: Number, default: 0},
    color: {type: String, default:""},
    gas:   {type: String, default:""},
    id_driverF: {type: String, default:""}
})

module.exports = mongoose.model('Car',CarSchema)