const express = require('express');
const Route = express.Router();
const API = require(__dirname + '/../../models/DB/DB_API');


Route.get('/:tab', (req, res)=>{
    let tab = req.params.tab;
    API.get(tab, res);
});

Route.post('/:tab', (req, res)=>{
    let tab = req.params.tab;
    API.post(tab, req.body, res);
});

Route.put('/:tab', (req, res)=>{
    let tab = req.params.tab;
    API.put(tab, req.body, res);
});

Route.delete('/:tab', (req, res)=>{
    let tab = req.params.tab;
    API.delete(tab, req.body.id, res);
});



module.exports = Route;
