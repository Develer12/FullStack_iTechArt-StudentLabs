const express = require('express');
const Route = express.Router();
const order = require(__dirname + '/api/order');


Route.use('/orders', order);


module.exports = Route;
