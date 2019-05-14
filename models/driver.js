'use strict'

//importando mongoose, super importante
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//definiendo schema
const DriverSchema = new Schema({
    name1: { type: String },
    name2: { type: String },
    last_name1: { type: String },
    last_name2: { type: String },
    date: { type: Date },
    email: { type: String },
    gender: { type: String },
    status: { type: Boolean },
    into: { type: Boolean },
    id_carnet: { type: Number },
    id_internalCarnet: { type: String },
    id_addressF: { type: String }

})

module.exports = mongoose.model('Driver', DriverSchema)