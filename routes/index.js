'use strict'

const express = require('express')
const userController = require('../controllers/user')
const driverController = require('../controllers/driver')
const api = express.Router()
const auth = require('../middlewares/auth')

//registro usuario y login
api.post('/signup', userController.signUp)
api.post('/signin', userController.signIn)

//borrar usuario
api.delete('/delete/:userId', userController.deleteUser)

//mostrar usuarios
api.get('/usuarios',userController.showUser)

//Registar conductor
api.post('/registerDriver',driverController.createDriver)

//mostrar conductores
api.get('/showDrivers',driverController.showDrivers)

//verificar carnet
api.post('/verifyCarnet/', driverController.verifyDriver)

api.get('/private', auth, function(req,res){
    res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api