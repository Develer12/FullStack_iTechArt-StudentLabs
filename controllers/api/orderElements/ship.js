const express = require('express');
const Route = express.Router();
const API = require(__dirname + '/../../../models/DB/DB_API');


//Get customer
Route.get('/addresses', (req, res)=>{
    let List= [];
    API.get('customer', res)
    .then(results => {
        results.forEach(el => {
            List.push( {
                id: el.id,
                firstName: el.firstName,
                lastName: el.lastName,
                email: el.email,
                shipId: el.shipId
            });
        });

        res.json(List);
    });
});

//Insert customer
Route.post('/', (req, res)=>{
    API.post('customer', req.body, res)
    .then(() => res.json({}));
});

//Update customer
Route.put('/', (req, res)=>{
    req.body.update_id = { id: req.body.id};
    delete req.body.id;
    
    API.put('customer', req.body, res)
    .then(() => res.json({}));
});

//Delete customer
Route.delete('/:id(\\d+)/', (req, res)=>{
    let id = req.params.id;

    API.delete('customer', {id: id}, res)
    .then(() => res.json({}));
});

///////////////////////
/////SHIP IN ORDER/////
///////////////////////

//Get order ship
Route.get('/', (req, res)=>{
    let List= [];
    let query = `select addresseeInfos.id, address, zip, region, country, firstName, lastName, email
        from ships, addresseeInfos where shipId = ships.id;`
    API.raw(query, res)
    .then(results => {
        results[0].forEach(el => {
            List.push({
                id: el.id,
                firstName: el.firstName,
                lastName: el.lastName,
                email: el.email,
                address: el.address,
                zip: el.zip,
                region: el.region,
                country: el.country
            });
        });

        res.json(List);
    });
});

//edit order ship
Route.put('/:order_id(\\d+)/', (req, res)=>{
    let body = {};
    body.update_id = { id: req.params.order_id};
    body.addresseeId = req.body.id;

    API.put('order', body, res)
    .then(() => res.json({}));
});


module.exports = Route;