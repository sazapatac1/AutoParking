'use strict'

const Address = require('../models/address')

function createAddress(data){

    const address = new Address(data);

    address.save((err, address)=>{
        if (err) return true
        return address._id
    });
}

module.exports = {
    createAddress
}
