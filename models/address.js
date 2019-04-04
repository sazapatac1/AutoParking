'use strict'

//importando mongoose, super importante
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//definiendo schema
const AddressSchema = new Schema({
    city: {type: String},
    add1: {type: String, enum: ['Calle','Avenida','Carrera','Diagonal']},
    add2: {type: Number},
    add3: {type: Number},
    add4: {type: Number},
    latitude: {type: Number},
    longitude: {type: Number}
})

module.exports = mongoose.model('Address',AddressSchema)