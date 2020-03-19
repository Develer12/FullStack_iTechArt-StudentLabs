const express = require('express');
const Route = express.Router();


Route.post('/', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
    if(req.headers['content-type'] == 'text/plain'){
        res.end(`SERVER:${req.body}`);
    }
    else{
        res.end(`Wrong content-type`);
    }
});
  

module.exports = Route;