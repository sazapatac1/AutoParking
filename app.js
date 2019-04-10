'use strict'

//importando express, bodyParser e inicializando express
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const path = require('path');


//api
const api = require('./routes')

//definiendo bodyparser
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/api',api)

module.exports = app