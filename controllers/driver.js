'use strict'

const Driver = require('../models/driver')
const service = require('../services')

const AddressController = require('./address')
const CarController = require('./car')
const ParkingLotController = require('./parkingLot')

function createDriverWeb(req, res) {
    var addressJson = {
        city: req.body.city,
        add1: req.body.add1,
        add2: req.body.add2,
        add3: req.body.add3,
        add4: req.body.add4
    }

    var id_addressF = AddressController.createAddress(addressJson);

    if (id_addressF == null) {
        return res.status(500).send({ message: `Error al almacenar conductor: Falla almacenando informacion de direccion` })
    }

    var driver = {
        name1: req.body.name1,
        name2: req.body.name2,
        last_name1: req.body.last_name1,
        last_name2: req.body.last_name2,
        date: req.body.date,
        email: req.body.email,
        gender: req.body.gender,
        status: req.body.status,
        into: false,
        id_carnet: req.body.id_carnet,
        id_internalCarnet: req.body.id_internalCarnet,
        id_addressF: id_addressF
    }

    //Buscar para actualizar y crear
    let emailFind = req.body.email
    Driver.updateOne({ 'email': emailFind }, driver, { upsert: true }, function (err) {
        if (err) return res.status(500).send({ message: `Error al registrar usuario: ${err}` })
        Driver.findOne({ 'email': emailFind }, '_id', function (err, driver) {
            console.log(driver._id);
            var carJson = {
                car_plate: req.body.car_plate,
                model: req.body.model,
                color: req.body.color,
                gas: req.body.gas,
                id_driverF: driver._id
            }

            if (CarController.createCar(carJson) == null) {
                return res.status(500).send({ message: `Error al almacenar conductor: Falla almacenando informacion del vehículo` })
            }
        })
        return res.status(200).send({ message: `Conductor almacenado/actualizado` })
    })
}

function showDrivers(req, res) {
    //buscar todo en base de datos
    Driver.find({},(err,drivers) =>{
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!drivers) return res.status(404).send({message: `No existen conductores`})
        var driversList = []
        for(var i = 0; i < drivers.length;i++){
            //AddressController.getAddress(drivers[i].id_addressF).then(function(result){
                //console.log(result)
            //})
            //let car = CarController.getCar(drivers[i]._id)
            //console.log(car)
            let driverToSend = {
                id: drivers[i]._id,
                name1: drivers[i].name1,
                name2: drivers[i].name2,
                last_name1: drivers[i].last_name1,
                last_name2: drivers[i].last_name2,
                date: drivers[i].date,
                email: drivers[i].email,
                gender: drivers[i].gender,
                status: drivers[i].status,
                into: drivers[i].into,
                id_carnet: drivers[i].id_carnet,
                id_internalCarnet: drivers[i].id_internalCarnet,
                id_addressF: drivers[i].id_addressF,
                times: drivers[i].times,
            }
            driversList.push(driverToSend)
        }
        res.status(200).send({driversList})
    })
}

/*function showDrivers(req,res){
    //buscar todo en base de datos
    Driver.find({},(err, drivers) =>{
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!drivers) return res.status(404).send({message: `No existen conductores`})
        res.status(200).send({drivers})
    })
}*/

function verifyDriver(req, res) {
    let id_carnetFind = req.body.id_carnetFind
    Driver.findOne({ 'id_internalCarnet': id_carnetFind }, '_id status into', function (err, driver) {
        if (err) return res.status(500).send({ message: `Error al encontrar el usuario: ${err}` })
        if (!driver) { return res.status(200).send({ access: false }) }
        if (driver.status) {
            if (driver.into) {
                //incrementando el número de celdas
                ParkingLotController.increaseCells("EAFIT")
                Driver.updateOne({ '_id': driver._id }, { into: false }, function (err) {
                    if (err) return res.status(500).send({ message: `Error al registrar usuario: ${err}` })
                    console.log('into: false')
                })
            }

            if (!driver.into) {
                //incrementando las veces usadas en el proyecto
                increaseTimes(driver._id)
                // decrementando el número de celdas
                ParkingLotController.decreaseCells("EAFIT")
                Driver.updateOne({ '_id': driver._id }, { into: true }, function (err) {
                    if (err) return res.status(500).send({ message: `Error al registrar usuario: ${err}` })
                    console.log('into: true')
                })
            }

            return res.status(200).send({ access: true })
        }
        else {
            return res.status(200).send({ access: false })
        }

    })
}

function deleteDriver(req, res) {
    let driverID = req.body.id_driver
    Driver.findById(driverID, (err, driver) => {
        if (err) res.status(500).send({ message: `Error al borrar conductor: ${err}` })

        driver.remove(err => {
            if (err) res.status(500).send({ message: `Error al borrar el usuario: ${err}` })
            res.status(200).send({ message: 'El conductor ha sido eliminado' })
        })


    })
}

function createDriverExcel(req, res) {
    allDriverinFalse()
    for (var i = 0; i < req.body.driverList.length; i++) {
        let emailFind = req.body.driverList[i].email

        var driverJSON = {
            email: emailFind,
            status: true,
            into: false,
            id_carnet: parseInt(req.body.driverList[i].id_Carnet)
        }
        Driver.updateOne({ 'email': emailFind }, driverJSON, { upsert: true }, function (err) {
            if (err) return res.status(500).send({ message: `Error al registrar usuario: ${err}` })
        })
    }
    return res.status(200).send({ message: 'Conductores creados/actualizados' })
}

function increaseTimes(_id){
    Driver.findOne({'_id': _id}, 'times', function(err,driver){
        if(err) return console.log(`Error al encontrar conductor: ${err}`)
        if(!driver) return console.log('No existe conductor')
        if(driver){
            var updateJSON = {
                times: driver.times + 1
            }
            Driver.updateOne({'_id':_id},updateJSON,function(err){
                if(err) return console.log(`Error al incrementar veces usadas ${err}`)
            })
        }
    })
}

function allDriverinFalse(){
    Driver.updateMany({},{status: false},function(err){
        if(err) return console.log(`Error al cambiar todos los conductores a falso ${err}`)
    })
    return console.log({ message: 'Todos los conductores no tienen beneficio' })}

module.exports = {
    createDriverWeb,
    showDrivers,
    verifyDriver,
    deleteDriver,
    createDriverExcel,
    increaseTimes,
    allDriverinFalse
}
