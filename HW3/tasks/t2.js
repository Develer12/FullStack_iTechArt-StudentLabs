const express = require('express');
const Route = express.Router();

Route.get('/SUM', (req, res)=>{
    let x = Number(req.query.x);
    let y = Number(req.query.y);

    let z = x + y;

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${x} + ${y} = ${z}`);
});

Route.get('/SUB', (req, res)=>{
    let x = Number(req.query.x);
    let y = Number(req.query.y);

    let z = x - y;

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${x} - ${y} = ${z}`);
});

Route.get('/CONC', (req, res)=>{
    let x = req.query.x;
    let y = req.query.y;

    let z = x + y;

    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${x} + ${y} = ${z}`);
}); 

module.exports = Route;