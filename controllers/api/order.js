const express = require('express');
const Route = express.Router();
const API = require(__dirname + '/../../models/DB/DB_API');


////////////////////////////////////////////////////////////////////////////////////
///////////////////////////              ORDER             /////////////////////////

//Get order
Route.get('/', (req, res) =>{
    console.log("Get OrderList");
    let OrderList= [];
    API.get('order', res)
    .then(results => {
        results.forEach(element => {
            OrderList.push( {
                id: element.id, 
                createdAt: element.createdAt,
                customer: element.customer,
                status: element.status,
                shippedAt: element.shippedAt
            });
        });

        res.json(OrderList);
    });
});

Route.get('/:n', (req, res) =>{ 
    let id = req.params.n;  
    console.log("Get OrderList " + id);
    let OrderList;
    let option = { where: { order_id: id}};

    API.search('order', option, res)
    .then(results => {
        OrderList = {
            id: id,
            OrderInfo: {
				createdAt: results.createdAt,
				customer: results.customer,
				status: results.status,
				shippedAt: results.shippedAt
			}, 
            ShipTo: '',
            ProcessorInfo: '',
            CustomerInfo: '',
            products: []
        };
    });

    API.search('ship', option, res)
    .then(results => {
        OrderList.ShipTo = {
            name: results.name,
            Address: results.address,
            ZIP: results.zip,
            Region: results.region,
            Country: results.country
        };
    });

    API.search('processor', option, res)
    .then(results => {
        OrderList.ProcessorInfo = {
            name: results.name,
            employeeId: results.employeeId,
            jobTitle: results.jobTitle,
            phone: results.phone
        };
    });

    API.search('customer', option, res)
    .then(results => {
        OrderList.CustomerInfo = {
            firstName: results.firstName,
            lastName: results.lastName,
            address: results.address,
            phone: results.phone,
            email: results.email
        };
    });
    
    API.search('product', option, res)
    .then(results => {
        results.forEach(element => {
            OrderList.products.push({
                id: element.id,
				name: element.name,
				price: element.price,
				currency: element.currency,
				quantity: element.quantity,
				totalPrice: (Number(element.quantity) * Number(element.price))
            });
        });
    });
    
    res.json(OrderList);
});

Route.get('/search', (req, res) =>{
    console.log("Get OrderList");
    let input = req.query.i; 
    let OrderList= [];
    let option = { where: { id: id}};
    
    API.search('order', option, res)
    .then(results => {
        results.forEach(element => {
            if((element.id.indexOf(input) + 1) 
            || (element.createdAt.indexOf(input) + 1) 
            || (element.customer.toLowerCase().indexOf(input.toLowerCase()) + 1) 
            || (element.status.toLowerCase().indexOf(input.toLowerCase()) + 1) 
            || (element.shippedAt.indexOf(input) + 1)){
                OrderList.push( {
                    id: element.id, 
                    createdAt: element.createdAt,
                    customer: element.customer,
                    status: element.status,
                    shippedAt: element.shippedAt
                });
            }
        });

        res.json(OrderList);
    });
});

//Edit order
Route.post('/', (req, res)=>{
    API.post('order', req.body, res)
    .then(results => res.json(results));
});

Route.put('/', (req, res)=>{
    API.put('order', req.body, res)
    .then(results => res.json(results));
});

Route.delete('/:order_id', (req, res)=>{
    let id = req.params.order_id;
    API.delete('order', {id: id}, res)
    .then(results => res.json(results));
});

Route.get('/items/search', (req, res) =>{
    console.log("Get OrderList");
    let input = req.query.i;
    let id = req.query.id;
    let ItemsList= [];
    let option = { where: { id: id}};
    
    API.search('product', option, res)
    .then(results => {
        results.forEach(element => {
            if((element.id.indexOf(input) + 1) 
            || (element.name.toLowerCase().indexOf(input.toLowerCase()) + 1) 
            || (element.price.indexOf(input) + 1) 
            || (element.totalPrice.indexOf(input) + 1) 
            || (element.currency.indexOf(input) + 1) 
            || (element.quantity.toLowerCase().indexOf(input.toLowerCase()) + 1)){
                ItemsList.push({
                    id: element.id,
                    name: element.name,
                    price: element.price,
                    currency: element.currency,
                    quantity: element.quantity,
                    totalPrice: (Number(element.quantity) * Number(element.price))
                });
            }
        });

        res.json(ItemsList);
    });
});


////////////////////////////////////////////////////////////////////////////////////
///////////////////////////              ORDER ELEMENTS             ////////////////

//Search order products
Route.get('/items/search', (req, res) =>{
    console.log("Get OrderList");
    let input = req.query.i;
    let id = req.query.id;
    let ItemsList= [];
    let option = { where: { id: id}};
    
    API.search('product', option, res)
    .then(results => {
        results.forEach(element => {
            if((element.id.indexOf(input) + 1) 
            || (element.name.toLowerCase().indexOf(input.toLowerCase()) + 1) 
            || (element.price.indexOf(input) + 1) 
            || (element.totalPrice.indexOf(input) + 1) 
            || (element.currency.indexOf(input) + 1) 
            || (element.quantity.toLowerCase().indexOf(input.toLowerCase()) + 1)){
                ItemsList.push({
                    id: element.id,
                    name: element.name,
                    price: element.price,
                    currency: element.currency,
                    quantity: element.quantity,
                    totalPrice: (Number(element.quantity) * Number(element.price))
                });
            }
        });

        res.json(ItemsList);
    });
});

//edit order products
Route.post('/items/:order_id', (req, res)=>{
    req.body.order_id = req.params.order_id;
    API.post('product', req.body, res)
    .then(results => res.json(results));
});

Route.put('/items/:order_id', (req, res)=>{
    req.body.order_id = req.params.order_id;
    API.put('product', req.body, res)
    .then(results => res.json(results));
});

Route.delete('/:item_id/:order_id', (req, res)=>{
    let item = req.params.item_id;
    let order = req.params.order_id;
    API.delete('product', {id: item, order_id: order}, res)
    .then(results => res.json(results));
});

//edit order elements
Route.put('/process/:order_id', (req, res)=>{
    req.body.order_id = req.params.order_id;
    API.put('process', req.body, res)
    .then(results => res.json(results));
});

Route.put('/ship/:order_id', (req, res)=>{
    req.body.order_id = req.params.order_id;
    API.put('ship', req.body, res)
    .then(results => res.json(results));
});


module.exports = Route;
