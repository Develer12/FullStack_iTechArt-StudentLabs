const express = require('express');
const Route = express.Router();

Route.get('/', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${req.method}:${req.url}`);
});

Route.get('/A', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${req.method}:${req.url}`);
});

Route.get('/A/B', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${req.method}:${req.url}`);
});

Route.post('/', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${req.method}:${req.url}`);
});

Route.post('/C', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${req.method}:${req.url}`);
});

Route.post('/C/D', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    res.end(`${req.method}:${req.url}`);
});
  

module.exports = Route;