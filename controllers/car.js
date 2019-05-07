'use strict'

const Car = require('../models/car')

function createCar(data) {
    
    const car = new Car(data);

    car.save((err, car) => {
        if (err) return true
        return car._id
    })
}

function showCars(req,res){
    //buscar todo en base de datos
    Car.find({},(err,cars) =>{
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!cars) return res.status(404).send({message: `No existen automoviles`})
        res.send(200, {cars})
    })
}


module.exports = {
    createCar,
    showCars
}