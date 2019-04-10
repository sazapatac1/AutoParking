'use strict'

const Driver = require('../models/driver')
const Address = require('../models/address')
const Car = require('../models/car')
const service = require('../services')
// libreria moment(manejar tiempo)
const moment = require('moment')

function createDriver(req,res){
    const address = new Address({
        city: req.body.city,
        add1: req.body.add1,
        add2: req.body.add2,
        add3: req.body.add3,
        add4: req.body.add4,
        latitude: req.body.latitude,
        longitude: req.body.longitude
    }) 
    address.save((err)=>{
        if (err) return res.status(500).send({ message: `Error al almacenar direccion: ${err}` })
    })

    const driver = new Driver({
        name1: req.body.name1,
        name2: req.body.name2,
        last_name1: req.body.last_name1,
        last_name2: req.body.last_name2,
        //registrar date cuando se cree usurio
        date: req.body.fecha_nac,
        email: req.body.email,
        gender: req.body.gender,
        //pendiente cambiar para segundo sprint
        status: true,
        into: false,
        id_carnet: req.body.id_carnet,
        id_internalCarnet: req.body.id_internalCarnet,
        //pendiente para cuando se este creando poner el id foraneo de address
        id_addressF: address.id
    })

    driver.save((err)=>{
        if (err) return res.status(500).send({ message: `Error al almacenar conductor: ${err}` })
    })

    const car = new Car({
        car_plate: req.body.car_plate,
        model: req.body.model,
        color: req.body.color,
        gas: req.body.gas,
        id_driverF: driver.id
    })
    
    car.save((err)=>{
        if (err) return res.status(500).send({ message: `Error al almacenar carro: ${err}` })

        return  res.status(200).send({message:`El usuario ${driver.name1} ${driver.last_name1} fue registrado`}) 
        
    })
}

function showDrivers(req,res){
    //buscar todo en base de datos
    Driver.find({},(err,drivers) =>{
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!drivers) return res.status(404).send({message: `No existen conductores`})
        res.send(200, {drivers})
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

module.exports = {
    createDriver,
    showDrivers,
    verifyDriver,
    deleteDriver
}
