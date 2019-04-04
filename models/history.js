'use strict'

//importando mongoose, super importante
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//definiendo schema
const HistorySchema = new Schema({
    date_in: {type: Date},
    date_out: {type: Date},
    id_dirverF: {type: Number}
})

module.exports = mongoose.model('History',HistorySchema)