'use strict'

const Driver = require('../models/driver')

const AddressController = require('./addressController')
const CarController = require('./carController')
// libreria moment(manejar tiempo)
const moment = require('moment')

function createDriver(req, res) {

    var addressJson = {
        city: req.body.city,
        add1: req.body.add1,
        add2: req.body.add2,
        add3: req.body.add3,
        add4: req.body.add4,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }



    var id_addressF = AddressController.createAddress(addressJson);

    if (id_addressF) {
        return res.status(500).send({ message: `Error al almacenar conductor: Falla almacenando informacion de direccion` })
    }

    const driver = new Driver({
        name1: req.body.name1,
        name2: req.body.name2,
        last_name1: req.body.last_name1,
        last_name2: req.body.last_name2,
        date: req.body.date,
        email: req.body.email,
        gender: req.body.gender,
        //pendiente cambiar para segundo sprint
        status: true,
        into: false,
        id_carnet: req.body.id_carnet,
        id_internalCarnet: req.body.id_internalCarnet,
        //pendiente para cuando se este creando poner el id foraneo de address
        id_addressF: id_addressF
    })

    var id_driver;

    driver.save((err, driver) => {
        if (err) return res.status(500).send({ message: `Error al almacenar conductor: Falla almacenando datos del conductor` })
        id_driver = driver._id
    })

    var carJson = {
        car_plate: req.body.car_plate,
        model: req.body.model,
        color: req.body.color,
        gas: req.body.gas,
        id_driverF: id_driver
    }

    if (CarController.createCar(carJson)) {
        return res.status(500).send({ message: `Error al almacenar conductor: Falla almacenando informacion del vehículo` })
    }

    return res.status(200).send({ message: 'Conductor almacenado' })
}



function showDrivers(req, res) {
    //buscar todo en base de datos
    Driver.find({}, (err, drivers) => {
        if (err) return res.status(500).send({ message: `Error al realizar la petición: ${err}` })
        if (!drivers) return res.status(404).send({ message: `No existen conductores` })
        return res.status(200).send({ drivers })
    })

}

function verifyDriver(req, res) {
    let id_carnetFind = req.body.id_carnetFind

    Driver.findOne({ 'id_internalCarnet': id_carnetFind }, 'name1 last_name1 status', function (err, driver) {
        if (err) return res.status(500).send({ message: `Error al encontrar el usuario: ${err}` })
        if (!driver) { return res.status(200).send({ access: false }) }
        if (driver.status) {
            return res.status(200).send({ access: true })
        }
        return res.status(200).send({ access: false })
    })
}

module.exports = {
    createDriver,
    showDrivers,
    verifyDriver
}