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
        res.status(200).send({addresss})
    })
}

/*function getAddress(_id){
    Address.findOne({_id:_id},function(err,address){
        if(err)return null 
        return address
    })
}

//function con promise
function getAddress(_id){
    return new Promise((resolve,reject)=>{
        Address.findOne({_id:_id},function(err,address){
            if(err) reject(null)
            if(!address) resolve(null)
            resolve(address)
        })
    })
}*/

module.exports = {
    createAddress,
    showAddress,
    //getAddress,
}