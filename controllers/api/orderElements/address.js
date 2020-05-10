const express = require('express');
const Route = express.Router();
const API = require(__dirname + '/../../../models/DB/DB_API');


//Get order ship addresses
Route.get('/', (req, res)=>{
    let List= [];
    API.get('ship', res)
    .then(results => {
        results.forEach(el => {
            List.push({
                id: el.id,
                Address: el.address,
                ZIP: el.zip,
                Region: el.region,
                Country: el.country
            });
        });

        res.json(List);
    });
});

//Get order ship address by id
Route.get('/:id(\\d+)/', (req, res)=>{
    let List= {};
    let option = { where: { id: req.params.id}};

    API.search('ship', option, res)
    .then(results => {
        if(results[0]){
            results = results[0].dataValues;
            List = {
                id: results.id,
                address: results.address,
                zip: results.zip,
                region: results.region,
                country: results.country
            };  
        }

        res.json(List)
    });
});

//Insert order ship address
Route.post('/', (req, res)=>{
    API.post('ship', req.body, res)
    .then(() => res.json({}));
});

//Update order ship address
Route.put('/', (req, res)=>{
    let id = req.body.id;
    req.body.update_id = { id: id};
    delete req.body.id;

    API.put('ship', req.body, res)
    .then(() => res.json({}));
});

//Delete customer
Route.delete('/:id(\\d+)/', (req, res)=>{
    let id = req.params.id;

    API.delete('ship', {id: id}, res)
    .then(() => res.json({}));
});


module.exports = Route;