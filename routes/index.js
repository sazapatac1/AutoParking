'use strict'

const express = require('express')
const userController = require('../controllers/userController')
const driverController = require('../controllers/driverController')
const api = express.Router()
const auth = require('../middlewares/auth')

//Admin
api.post('/signup', userController.signUp)
api.post('/signin', userController.signIn)
api.delete('/delete/:userId', userController.deleteUser)
api.get('/usuarios', userController.showUser)

//Driver
api.post('/registerDriver',driverController.createDriver)
api.get('/showDrivers',driverController.showDrivers)
api.post('/verifyCarnet', driverController.verifyDriver)


//Addres



//Car



//History


//api.get('/private', auth, function(req,res){
//    res.status(200).send({message: 'Tienes acceso'})
//})

module.exports = api