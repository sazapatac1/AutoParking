'use strict'

const express = require('express')
const userController = require('../controllers/user')
const api = express.Router()
const auth = require('../middlewares/auth')

//registro usuario y login
api.post('/signup', userController.signUp)
api.post('/signin', userController.signIn)

//borrar usuario
api.delete('/delete/:userId', userController.deleteUser)

//mostrar usuarios
api.get('/usuarios',userController.showUser)

api.get('/private', auth, function(req,res){
    res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api