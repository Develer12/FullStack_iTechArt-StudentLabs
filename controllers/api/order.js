const express = require('express');
const Route = express.Router();
const API = require(__dirname + '/../../models/DB/DB_API');
const moment = require('moment');

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
                createdAt: moment(element.createdAt).format('DD.MM.YYYY'),
                customer: element.customer,
                status: element.status,
                shippedAt: moment(element.shippedAt).format('DD.MM.YYYY')
            });
        });

        res.json(OrderList);
    });
});

Route.get('/search', (req, res) =>{
    console.log("Search OrderList");
    let input = req.query.i;
    let filter = req.query.filter; 

    let OrderList= [];
    
    API.get('order', res)
    .then(results => {
        results.forEach(element => {
            element = element.dataValues;

            for(e in element){
                element[e] = element[e] == null? '' : element[e];
            };

            let filterBool;
            if(filter == 'number'){
                filterBool = (element.id.toString().indexOf(input) + 1) 
                || (('order '+element.id.toString()).indexOf(input.toLowerCase()) + 1);
            }
            else if(filter == 'shipped'){
                filterBool = (element.shippedAt.toString().indexOf(input) + 1);
            }
            else if(filter == 'completed'){
                filterBool = (element.createdAt.toString().indexOf(input) + 1);
            }
            else if(filter == 'customer'){
                filterBool = (element.customer.toLowerCase().indexOf(input.toLowerCase()) + 1);
            }
            else{
                filterBool = (element.id.toString().indexOf(input) + 1) 
                || (('order '+element.id.toString()).indexOf(input.toLowerCase()) + 1)
                || (element.createdAt.toString().indexOf(input) + 1) 
                || (element.customer.toLowerCase().indexOf(input.toLowerCase()) + 1) 
                || (element.shippedAt.toString().indexOf(input) + 1);
            }


            if(filterBool){
                OrderList.push( {
                    id: element.id, 
                    createdAt: moment(element.createdAt).format('DD.MM.YYYY'),
                    customer: element.customer,
                    status: element.status,
                    shippedAt: moment(element.shippedAt).format('DD.MM.YYYY')
                });
            }
        });
    })
    .then(() => {
        res.json(OrderList);
    });
});

Route.get('/:n', (req, res) =>{ 
    let id = req.params.n;  
    console.log("Get OrderList " + id);
    let OrderList;
    let option = { where: { order_id: id}};

    API.search('order', { where: { id: id}}, res)
    .then(results => {
        results = results[0];
        if(results){
            results = results.dataValues; 
        }
        OrderList = {
            id: id,
            OrderInfo: {
				createdAt: moment(results.createdAt).format('DD.MM.YYYY'),
				customer: results.customer,
				status: results.status,
				shippedAt: moment(results.shippedAt).format('DD.MM.YYYY')
			}, 
            ShipTo: {},
            ProcessorInfo: {},
            CustomerInfo: {},
            products: []
        };
    })
    .then(() => {
        API.search('ship', option, res)
        .then(results => {
            results = results[0];
            if(results){
                results = results.dataValues;
                OrderList.ShipTo = {
                    name: results.name,
                    Address: results.address,
                    ZIP: results.zip,
                    Region: results.region,
                    Country: results.country
                };  
            }
        });
    })
    .then(() => {
        API.search('processor', option, res)
        .then(results => {
            results = results[0];
            if(results){
                results = results.dataValues;  
                OrderList.ProcessorInfo = {
                    name: results.name,
                    employeeId: results.employeeId,
                    jobTitle: results.jobTitle,
                    phone: results.phone
                };
            }
        });
    })
    .then(() => {
        API.search('customer', option, res)
        .then(results => {
            results = results[0];
            if(results){
                results = results.dataValues;  
                OrderList.CustomerInfo = {
                    firstName: results.firstName,
                    lastName: results.lastName,
                    address: results.address,
                    phone: results.phone,
                    email: results.email
                };
            }
        });
    })
    .then(() => {
        API.search('product', option, res)
        .then(results => {
            results.forEach(element => {
                element = element.dataValues;
                OrderList.products.push({
                    id: element.prod_id,
                    name: element.name,
                    price: element.price,
                    currency: element.currency,
                    quantity: element.quantity,
                    totalPrice: (Number(element.quantity) * Number(element.price))
                });
            });
        })
        .then(() => {
            res.json(OrderList);
        });
    });
});

//Edit order
Route.post('/', (req, res)=>{
    let id = req.body.id;

    API.post('order', req.body, res)
    .then(() => {
        API.post('ship', {
            order_id: req.body.id,
            name: null,
            address: null,
            zip: null,
            region: null,
            country: null
        }, res);
    })
    .then(() => {
        API.post('processor', {
            order_id: req.body.id,
            name: null,
            employeeId: null,
            jobTitle: null,
            phone: null
        }, res);
    })
    .then(() => {
        API.post('customer', {
            firstName:null,
            lastName: null,
            email: null,
            order_id: req.body.id,
        }, res);
    })
    .then(() => res.json({}));
});

Route.put('/', (req, res)=>{
    req.body.update_id = { id: req.body.id};
    API.put('order', req.body, res)
    .then(() => res.json({}));
});

Route.delete('/:order_id', (req, res)=>{
    let id = req.params.order_id;
    let option = {order_id: id};
    API.delete('order', {id: id}, res)
    .then(() => res.json({}));
});


////////////////////////////////////////////////////////////////////////////////////
///////////////////////////              ORDER ELEMENTS             ////////////////

//Search order products
Route.get('/item/search', (req, res) =>{
    console.log("Get OrderList");
    let input = req.query.i;
    let id = req.query.id;
    let ItemsList= [];
    let option = { where: { order_id: id}};
    
    API.search('product', option, res)
    .then(results => {
        results.forEach(element => {
            element = element.dataValues;

            for(e in element){
                element[e] = element[e] == null? '' : element[e];
            };

            if((element.prod_id.toString().indexOf(input) + 1) 
            || (element.name.toLowerCase().indexOf(input.toLowerCase()) + 1) 
            || (element.price.toString().indexOf(input) + 1) 
            || (((Number(element.quantity) * Number(element.price))).toString().indexOf(input) + 1) 
            || (element.currency.indexOf(input) + 1) 
            || (element.quantity.toString().toLowerCase().indexOf(input.toLowerCase()) + 1)){
                ItemsList.push({
                    id: element.prod_id,
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
Route.post('/item/:order_id', (req, res)=>{
    req.body.order_id = req.params.order_id;
    API.post('product', req.body, res)
    .then(() => res.json({}));
});

Route.put('/item/:order_id', (req, res)=>{
    let item = req.body.prod_id;
    let order = req.params.order_id;
    req.body.update_id = {prod_id: item, order_id: order};
    API.put('product', req.body, res)
    .then(() => res.json({}));
});

Route.delete('/item/:item_id/:order_id', (req, res)=>{
    let item = req.params.item_id;
    let order = req.params.order_id;
    API.delete('product', {prod_id: item, order_id: order}, res)
    .then(() => res.json({}));
});

//edit order elements
Route.put('/process/:order_id', (req, res)=>{
    req.body.update_id = { order_id: req.params.order_id};
    API.put('processor', req.body, res)
    .then(() => res.json({}));
});

Route.put('/ship/:order_id', (req, res)=>{
    let update_id = { order_id: req.params.order_id};
    API.put('ship', {
        address: req.body.address,
        zip: req.body.zip,
        region: req.body.region,
        country: req.body.country,
        update_id: update_id
    }, res)
    .then(() => {
        API.put('customer', {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            update_id: update_id
        }, res);
    })
    .then(() => res.json({}));
});


module.exports = Route;
