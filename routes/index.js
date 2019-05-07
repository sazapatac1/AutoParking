'use strict'

const express = require('express')
const userController = require('../controllers/user')
const driverController = require('../controllers/driver')
const carController = require('../controllers/car')
const parkingLotController = require('../controllers/parkingLot')
const api = express.Router()
const auth = require('../middlewares/auth')

//registro usuario y login
api.post('/signup', userController.signUp)
api.post('/signin', userController.signIn)

//borrar usuario
api.delete('/delete/:userId', userController.deleteUser)

//mostrar usuarios
api.get('/usuarios',userController.showUser)

//Registar conductor desde web
api.post('/registerDriver',driverController.createDriverWeb)

//Registrar conductor desde excel
api.post('/registerDriverExcel',driverController.createDriverExcel)

//mostrar conductores
api.get('/showDrivers',driverController.showDrivers)

//mostrar carros
api.get('/showCars', carController.showCars)

//verificar carnet
api.post('/verifyCarnet/', driverController.verifyDriver)

api.get('/private', auth, function(req,res){
    res.status(200).send({message: 'Tienes acceso'})
})

//Borrar conductor
api.post('/deleteDriver',driverController.deleteDriver)


//celdas

//crear lote de parqueader
api.post('/createCells',parkingLotController.createParkingLot)

//incrementar celda
api.post('/increaseCells',parkingLotController.increaseCells)

//incrementar celda
api.post('/decreaseCells',parkingLotController.decreaseCells)

//mostrar celdas
api.get('/showCells',parkingLotController.showParkingLot)

//mostrar celda especifica
api.post('/showTheCells', parkingLotController.showAParkingLot)

module.exports = api