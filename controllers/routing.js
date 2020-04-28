const express = require('express');
const Route = express.Router();
const order = require(__dirname + '/routing/order');


Route.use('/orders', order);

Route.get('/', (req, res) =>{
    res.redirect('/orders');
});

module.exports = Route;
