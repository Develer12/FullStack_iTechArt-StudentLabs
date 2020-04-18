const express = require('express');
const path = require('path');
const request = require('request-promise')
const Route = express.Router();


Route.get('/', (req, res) =>{
    res.sendFile('index.html', { root: path.join(__dirname, '../../views') });
});

Route.get('/:n(\\d+)/', (req, res)=>{
    let id = req.params.n;
    request({
        method: 'GET',
        uri: 'http://localhost:3000/api/orders',
        json: true
    })
    .then((response) => {
        let idExists;
        response.forEach(element => {
            if(element.id == id){
                idExists = true;
                return;
            }
        });

        delete response;

        if(idExists){
            res.sendFile('index.html', { root: path.join(__dirname, '../../views') });
        }
        else{
            res.send(404);
        }
    })
    .catch(function (err) {
        console.log(`Request (module) ERROR: ${err}`);
    })
});

module.exports = Route;