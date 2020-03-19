const express = require('express');
const Route = express.Router();
const answer = require(__dirname + '/funcs');


Route.get('/SUM', (req, res)=>{
    let x = Number(req.query.x);
    let y = Number(req.query.y);

    answer.sum(res, x, y);
});

Route.get('/SUB', (req, res)=>{
    let x = Number(req.query.x);
    let y = Number(req.query.y);

    answer.sub(res, x, y);
});

Route.get('/CONC', (req, res)=>{
    let x = req.query.x;
    let y = req.query.y;

    answer.conc(res, x, y);
}); 

module.exports = Route;