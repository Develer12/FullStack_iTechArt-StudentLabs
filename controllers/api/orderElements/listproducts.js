const express = require('express');
const Route = express.Router();
const API = require(__dirname + '/../../../models/DB/DB_API');


//Get order ship list products by id
Route.get('/:id(\\d+)/', (req, res)=>{
    let List= {};
    let option = { where: {id: req.params.id}};

    API.search('listproduct', option, res)
    .then(results => {
        if(results[0]){
            results = results[0].dataValues;
            List = {
                id: results.id,
                name: results.name,
                price: results.price,
                currency: results.currency
            };  
        }

        res.json(List)
    });
});

//Insert order ship list products
Route.post('/', (req, res)=>{
    API.post('listproduct', req.body, res);
});

//Update order ship list products
Route.put('/', (req, res)=>{
    let id = req.body.id;
    let body = {
        id: id,
        name: req.body.name,
        price: req.body.price,
        currency: req.body.currency,
        update_id: {id: id}
    };

    API.put('listproduct', body, res);
});

//Delete order ship list products
Route.delete('/:id(\\d+)/', (req, res)=>{
    let id = req.params.id;

    API.delete('listproduct', {id: id}, res);
});


module.exports = Route;