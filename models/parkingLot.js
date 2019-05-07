'use strict'

//importando mongoose, super importante
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const parkingLotSchema = new Schema({
    name: {type:String},
    availableCells :{type: Number, default:150}
})

module.exports = mongoose.model('ParkingLot',parkingLotSchema)