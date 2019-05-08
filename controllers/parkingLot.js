const ParkingLot = require('../models/parkingLot')

function createParkingLot(req,res){

    const parkingLot = new ParkingLot({
        name: req.body.name,
        availableCells: req.body.availableCells
    });

    parkingLot.save((err, parkingLot)=>{
        if (err) return res.status(500).send({ message: `Error al crear el lote de parqueadero: ${err}` })
        return res.status(201).send({
            message: 'Registro exitoso',
            name: parkingLot.name
        })
    });
}

function showParkingLot (req,res){
    ParkingLot.find({},(err,parkingLots) =>{
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!parkingLots) return res.status(404).send({message: `No existen lotes de parqueadero`})
        res.send(200, {parkingLots})
    })
}

function showAParkingLot(req,res){
    let nameFind = req.body.name
    ParkingLot.findOne({'name': nameFind},'availableCells',function(err,parkingLot){
        if(err) return res.status(500).send({message : `Error al realizar la petición: ${err}` })
        if(!parkingLot) return res.status(404).send({message: `No existe el lote ${nameFind}`})
        res.send(200, {Available: parkingLot.availableCells})
    })
}

function increaseCells(name){
    let nameFind = name
    ParkingLot.findOne({'name': nameFind}, 'availableCells', function(err,parkingLot){
        if(err) return console.log(`Error al encontrar lote de parqueo: ${err}`)
        if(!parkingLot) return console.log('No existe lote de parkeo')
        if(parkingLot){
            var updateJSON = {
                availableCells: parkingLot.availableCells + 1
            }
            ParkingLot.updateOne({'name':nameFind},updateJSON,function(err){
                if(err) return console.log(`Error al incrementar número de celdas: ${err}`)
                return console.log(`celdas actualizadas, número de celdas disponibles: ${parkingLot.availableCells+1}`)
            })
        }
    })
}

function decreaseCells(name){
    let nameFind = name
    ParkingLot.findOne({'name': nameFind}, 'availableCells', function(err,parkingLot){
        if(err) return console.log(`Error al encontrar lote de parqueo: ${err}`)
        if(!parkingLot) return console.log('No existe lote de parqueo')
        if(parkingLot){
            var updateJSON = {
                availableCells: parkingLot.availableCells - 1
            }
            ParkingLot.updateOne({'name':nameFind},updateJSON,function(err){
                if(err) return console.log(`Error al decrementar número de celdas: ${err}`)
                return console.log(`celdas actualizadas, número de celdas disponibles: ${parkingLot.availableCells-1}`)
            })
        }
    })
}

module.exports = {
    createParkingLot,
    increaseCells,
    decreaseCells,
    showParkingLot,
    showAParkingLot
}

