'use strict'

const Address = require('../models/address')

function createAddress(data){

    const address = new Address(data);
    var id = address._id;

    address.save((err, address)=>{
        if (err) return null        
    });
    return id;
}

function showAddress(req,res){
    //buscar todo en base de datos
    Address.find({},(err, addresss) =>{
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!addresss) return res.status(404).send({message: `No existen automoviles`})
        res.send(200, {addresss})
    })
}

module.exports = {
    createAddress,
    showAddress
}