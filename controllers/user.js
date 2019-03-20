'use strict'

const User = require('../models/user')
const service = require('../services')

function signUp(req,res){
    const user = new User({
        email: req.body.email,
        displayName: req.body.displayName,
        password: req.body.password
    })

    user.save((err) => {
        if(err) res.status(500).send({message: `Error al crear el usuario: ${err}`})

        return res.status(200).send({token: service.createToken(user)})
    })
}

function signIn(req,res){
    User.find({ email: req.body.email},(err,user)=>{
        if(err) return res.status(500).send({ message: err})
        
        if(!user) return res.status(404).send({message: 'No existe el usuario'})

        req.user = user
        res.status(200).send({
            message: "Te has logeado correctamente",
            token: service.createToken(user)
        })

    })
}

function deleteUser(req,res){
    let userId = req.params.userId

    User.findById(userId,(err,user) =>{
        if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})

        user.remove(err =>{
            if(err) res.status(500).send({message: `Error al borrar el usuario: ${err}`})
            res.status(200).send({message: 'El usuario ha sido eliminado'})
        })

    })
}

function showUser(req,res){
    //buscar todo en base de datos
    User.find({},(err,users) =>{
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!users) return res.status(404).send({message: `No existen usuarios`})
        res.send(200, {users})
    })
    
}

module.exports = {
    signUp,
    signIn,
    deleteUser,
    showUser
}