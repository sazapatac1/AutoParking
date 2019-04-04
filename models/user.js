'use strict'

//importando mongoose, super importante
const mongoose = require('mongoose')
const Schema = mongoose.Schema
//libreria encriptación
const bcrypt = require('bcrypt-nodejs')


//definiendo schema de usuario
const UserSchema = new Schema({
    displayName: { type: String },
    password:    { type: String, select: false },
    email:       { type: String, unique: true, lowercase:true }
})

UserSchema.pre('save', function (next) {
    let user = this
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err)
  
      bcrypt.hash(user.password, salt, null, function (err, hash){
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  })


module.exports = mongoose.model('User',UserSchema)
