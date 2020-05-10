const express = require('express');
const Route = express.Router();
const API = require(__dirname + '/../../../models/DB/DB_API');


//Get processor
Route.get('/', (req, res)=>{
    let List= [];
    API.get('processor', res)
    .then(results => {
        results.forEach(element => {
            List.push( {
                id: element.id,
                name: element.name,
                jobTitle: element.jobTitle,
                phone: element.phone
            });
        });

        res.json(List);
    });
});

//Insert processor
Route.post('/', (req, res)=>{
    API.post('processor', req.body, res)
    .then(() => res.json({}));
});

//Update processor
Route.put('/', (req, res)=>{
    req.body.update_id = { id: req.body.id};
    delete req.body.id;
    
    API.put('processor', req.body, res)
    .then(() => res.json({}));
});

//Delete processor
Route.delete('/:id(\\d+)/', (req, res)=>{
    let id = req.params.id;

    API.delete('processor', {id: id}, res)
    .then(() => res.json({}));
});

////////////////////////
///PROCESSOR IN ORDER///
////////////////////////

//Update order processor
Route.put('/:order_id(\\d+)/', (req, res)=>{
    let body = {};
    body.update_id = { id: req.params.order_id};
    body.employeeId = req.body.id;
    
    API.put('order', body, res)
    .then(() => res.json({}));
});


module.exports = Route;