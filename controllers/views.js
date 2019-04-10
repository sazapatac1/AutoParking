'use strict'

const router = require('./../routes')
var path = require('path');


function showIndex(req, res) {
    res.sendFile(path.resolve('views/index.html'))
}

function showCharts(req, res) {
    res.sendFile(path.resolve('views/charts.html'))
}

function showTables(req, res) {
    res.sendFile(path.resolve('views/tables.html'))
}


module.exports = {
    redirectSignin,
    showSignin,
    showSignup,
    showProfile
}