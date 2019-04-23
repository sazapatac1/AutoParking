'use strict'

const Car = require('../models/car')

function createCar(data) {
    
    const car = new Car(data);

    car.save((err, car) => {
        if (err) return true
        return car._id
    })
}


module.exports = {
    createCar
}