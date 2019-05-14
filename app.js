'use strict'

//importando express, bodyParser e inicializando express
const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()

//api
const api = require('./routes')

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/', api)

module.exports = app