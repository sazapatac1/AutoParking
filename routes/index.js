'use strict'

const express = require('express')

const userController = require('../controllers/user')
const driverController = require('../controllers/driver')
const carController = require('../controllers/car')
const addressController = require('../controllers/address')
const parkingLotController = require('../controllers/parkingLot')
const viewController = require('../controllers/view')

const api = express.Router()
const auth = require('../middlewares/auth')

// CRUD Administrador
api.post('/api/signup', userController.signUp)
api.post('/api/signin', userController.signIn)
api.delete('/api/delete/:userId', auth, userController.deleteUser)
api.get('/api/usuarios',userController.showUser)


//Registar conductor desde web
api.post('/api/registerDriver',auth, driverController.createDriverWeb)

//Registrar conductor desde excel
api.post('/api/registerDriverExcel',driverController.createDriverExcel)

//mostrar conductores
api.get('/api/showDrivers', driverController.showDrivers)

//mostrar carros
api.get('/api/showCars', carController.showCars)

//mostrar direccions
api.get('/api/showAddress',addressController.showAddress)

//verificar carnet
api.post('/api/verifyCarnet/', driverController.verifyDriver)

api.get('/api/private', auth, function(req,res){
    res.status(200).send({message: 'Tienes acceso'})
})

//Todos los drivers en falso
api.get('/api/allinFalse',driverController.allDriverinFalse)

//Borrar conductor
api.post('/api/deleteDriver',driverController.deleteDriver)


//celdas

//crear lote de parqueader
api.post('/api/createCells',parkingLotController.createParkingLot)
//incrementar celda
api.post('/api/increaseCells',parkingLotController.increaseCells)

//incrementar celda
api.post('/api/decreaseCells',parkingLotController.decreaseCells)

//mostrar celdas
api.get('/api/showCells',parkingLotController.showParkingLot)

//mostrar celda especifica
api.post('/api/showTheCells', parkingLotController.showAParkingLot)





//Vistas

//Views
api.get('/', viewController.redirectLogin)
api.get('/login', viewController.showLogin)
api.get('/conductores', viewController.showDrivers)
api.get('/actualizarConductores', viewController.showUpdateDrivers)
api.get('/archivo', viewController.showArchivo)


module.exports = api