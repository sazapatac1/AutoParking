'use strict'

//importando mongoose, super importante
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//definiendo schema
const DriverSchema = new Schema({
    name1: { type: String, default:""},
    name2: { type: String, default:""},
    last_name1: { type: String, default:""},
    last_name2: { type: String, default:"" },
    date: { type: String, default:""},
    email: { type: String, default:"" },
    gender: { type: String, default:"" },
    status: { type: Boolean, default: false },
    into: { type: Boolean, default:false},
    id_carnet: { type: String, default:"" },
    id_internalCarnet: { type: String, default:""},
    id_addressF: { type: String, default:"" },
    times: {type: Number, default:0}

})

module.exports = mongoose.model('Driver', DriverSchema)