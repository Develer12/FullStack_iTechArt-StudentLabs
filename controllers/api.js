const express = require('express');
const Route = express.Router();
const order = require(__dirname + '/api/order');


Route.use('/order', order);


module.exports = Route;
