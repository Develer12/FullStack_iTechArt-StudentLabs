const express = require('express');
const Route = express.Router();


Route.post('/', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
    if(req.headers['content-type'] == 'application/json'){
        res.end(JSON.stringify({SERVER: req.body}));
    }
    else{
        res.end(JSON.stringify({ERROR: `Wrong content-type`}));
    }
});
  

module.exports = Route;