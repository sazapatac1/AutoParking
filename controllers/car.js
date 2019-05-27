'use strict'

const Car = require('../models/car')

function createCar(data) {
    
    const car = new Car(data);

    var id = car._id;
    car.save((err, car) => {
        if (err) return null
    })
    return id;  
}

function showCars(req,res){
    //buscar todo en base de datos
    Car.find({},(err,cars) =>{
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!cars) return res.status(404).send({message: `No existen automoviles`})
        res.status(200).send({cars})
    })
}

/*function getCar(driver_id){
    Car.findOne({'id_driverF':driver_id},'car_plate',(err,car)=>{
        if(err) return console.log('Error al encontrar carro')
        console.log(car)
        return car
    })
}*/

module.exports = {
    createCar,
    showCars,
    //getCar
}