'use strict'

//importando express, bodyParser e inicializando express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

//api
const api = require('./routes')

//definiendo bodyparser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api',api)

module.exports = app