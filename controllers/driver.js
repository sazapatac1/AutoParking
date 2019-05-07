'use strict'

const Driver = require('../models/driver')
const Address = require('../models/address')
const Car = require('../models/car')
const service = require('../services')
// libreria moment(manejar tiempo)
const moment = require('moment')
const AddressController = require('./address')
const CarController = require('./car')

function createDriverWeb(req,res){

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

    var driver = {
        name1: req.body.name1,
        name2: req.body.name2,
        last_name1: req.body.last_name1,
        last_name2: req.body.last_name2,
        date: req.body.date,
        email: req.body.email,
        gender: req.body.gender,
        //falta status porque solo lo cambia el excel
        into: false,
        id_carnet: req.body.id_carnet,
        id_internalCarnet: req.body.id_internalCarnet,
        //pendiente para cuando se este creando poner el id foraneo de address
        id_addressF: id_addressF
    }

    //Buscar para actualizar y crear
    let emailFind = req.body.email
    Driver.updateOne({'email': emailFind},driver,function(err, driverFound){
        if(err) return res.status(500).send({message: `Error al registrar usuario: ${err}`})
        var carJson = {
            car_plate: req.body.car_plate,
            model: req.body.model,
            color: req.body.color,
            gas: req.body.gas,
            id_driverF: driverFound._id
        }

        if (CarController.createCar(carJson)) {
            return res.status(500).send({ message: `Error al almacenar conductor: Falla almacenando informacion del vehículo` })
        }

        return res.status(200).send({ message: `Conductor almacenado/actualizado ${driverFound._id} ${id_addressF}` })
    })
}

function showDrivers(req,res){
    //buscar todo en base de datos
    Driver.find({},(err,drivers) =>{
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!drivers) return res.status(404).send({message: `No existen conductores`})
        res.status(200).send({drivers})
    })
}


function verifyDriver(req,res){
    let id_carnetFind = req.body.id_carnetFind
    Driver.findOne({'id_internalCarnet': id_carnetFind}, 'name1 last_name1 status', function(err, driver){
        if(err) return res.status(500).send({message: `Error al encontrar el usuario: ${err}`})
        if(!driver){ return res.status(200).send({access: false})}
        if(driver.status){
            return res.status(200).send({access: true})
        }
        else{
            return res.status(200).send({access: false})
        }

    })
}

function deleteDriver(req,res){
    let driverID = req.body.id_driver
    Driver.findById(driverID,(err,driver)=>{
        if(err) res.status(500).send({message: `Error al borrar conductor: ${err}`})

        driver.remove(err =>{
            if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
            res.status(200).send({message: 'El conductor ha sido eliminado'})
        })


    })
}

function createDriverExcel(req,res){
    let emailFind = req.body.email
    var driverJSON =   {
    name1: req.body.name1,
    name2: req.body.name2,
    last_name1: req.body.last_name1,
    last_name2: req.body.last_name2,
    email: req.body.email,
    status: true,
    into: false
    }
    Driver.updateOne({'email': emailFind},driverJSON,{upsert: true}, function(err){
        if(err) return res.status(500).send({message: `Error al registrar usuario: ${err}`})
        return res.status(200).send({message: 'Conductor creado/actualizado'})
    })
}

module.exports = {
    createDriverWeb,
    showDrivers,
    verifyDriver,
    deleteDriver,
    createDriverExcel
}
