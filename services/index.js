'use strict'

// libreria jasonWebToken
const jwt = require('jwt-simple')
// libreria moment(manejar tiempo)
const moment = require('moment')
const config = require('../config')

//crear token
function createToken(user){
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'days').unix(),
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}

//descifrar token
function decodeToken (token){
    const decoded = new Promise((resolve,reject) => {
        try{
            const payload = jwt.decode(token, config.SECRET_TOKEN)
        //ya caducó
        if(payload.exp <= moment().unix){
            reject({
                status: 401,
                message: 'El token ha expirado'
            })
        }

        resolve(payload.sub)

        } catch(err){
            reject({
                status: 500,
                message: 'Invalid token'
            })
        }
    })
    return decoded
}

module.exports = {
    createToken,
    decodeToken
}