'use strict'

var path = require('path');

function redirectLogin(req, res) {
    res.redirect('/login');
}

function showLogin(req, res) {
    res.sendFile(path.resolve('public/login.html'))
}

function showDrivers(req, res){
    res.sendFile(path.resolve('public/drivers.html'))
}

function showUpdateDrivers(req, res) {
    res.sendFile(path.resolve('public/updateDrivers.html'))
}

function showArchivo(req, res){
    res.sendFile(path.resolve('public/file.html'))
}

function showStadistics(req, res){
    res.sendFile(path.resolve('public/stadistics.html'))
}

module.exports = {
    redirectLogin,
    showLogin,
    showUpdateDrivers,
    showDrivers,
    showArchivo,
    showStadistics
}