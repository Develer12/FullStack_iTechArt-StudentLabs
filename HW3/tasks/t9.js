const express = require('express');
const Route = express.Router();


Route.get('/', (req, res)=>{
    res.sendFile(__dirname + '/static/index.html');
});


module.exports = Route;