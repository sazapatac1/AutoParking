'use strict'

//importando mongoose, super importante
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//definiendo schema
const AddressSchema = new Schema({
    city: {type: String, default:""},
    add1: {type: String, default:""},
    add2: {type: Number, default:0},
    add3: {type: Number, default:0},
    add4: {type: Number, default:0}
})

module.exports = mongoose.model('Address',AddressSchema)