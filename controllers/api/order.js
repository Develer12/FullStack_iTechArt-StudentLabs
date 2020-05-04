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
                customer: element.customer,
                status: element.status,
                shippedAt: moment(element.shippedAt).format('DD.MM.YYYY'),
                acceptedAt: moment(element.acceptedAt).format('DD.MM.YYYY')
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
            else if(filter == 'accepted'){
                filterBool = (element.acceptedAt.toString().indexOf(input) + 1);
            }
            else if(filter == 'customer'){
                filterBool = (element.customer.toLowerCase().indexOf(input.toLowerCase()) + 1);
            }
            else{
                filterBool = (element.id.toString().indexOf(input) + 1) 
                || (('order '+element.id.toString()).indexOf(input.toLowerCase()) + 1)
                || (element.acceptedAt.toString().indexOf(input) + 1) 
                || (element.customer.toLowerCase().indexOf(input.toLowerCase()) + 1) 
                || (element.shippedAt.toString().indexOf(input) + 1);
            }


            if(filterBool){
                OrderList.push( {
                    id: element.id, 
                    acceptedAt: moment(element.acceptedAt).format('DD.MM.YYYY'),
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
    let option = { where: {id: id}};

    let employeeId;
    let addresseeId;

    API.search('order', option, res)
    .then(results => {
        results = results[0];
        if(results){
            results = results.dataValues; 

            employeeId = results.employeeId;
            addresseeId  = results.addresseeId;

            OrderList = {
                id: id,
                OrderInfo: {
                    acceptedAt: moment(results.acceptedAt).format('DD.MM.YYYY'),
                    customer: results.customer,
                    status: results.status,
                    shippedAt: moment(results.shippedAt).format('DD.MM.YYYY')
                }, 
                ShipTo: {},
                ProcessorInfo: {},
                CustomerInfo: {},
                products: []
            };
        }
    })
    .then(async () => {
        //processor
        option.where.id = employeeId;

        await API.search('processor', option, res)
        .then(results => {
            results = results[0];
            if(results){
                results = results.dataValues;  
                console.log('processor', 0)

                OrderList.ProcessorInfo = {
                    name: results.name,
                    employeeId: employeeId,
                    jobTitle: results.jobTitle,
                    phone: results.phone
                };
            }
        });

        //addressee/customer
        option.where.id = addresseeId;

        await API.search('customer', option, res)
        .then(results => {
            results = results[0];
            if(results){
                results = results.dataValues; 
                console.log('cust', 0)

                OrderList.CustomerInfo = {
                    firstName: results.firstName,
                    lastName: results.lastName,
                    email: results.email
                };

                option.where.id = results.shipId;
            }
        });

        //ship
        await API.search('ship', option, res)
        .then(results => {
            results = results[0];
            if(results){
                results = results.dataValues;
                console.log('ship', 0)
                OrderList.ShipTo = {
                    Address: results.address,
                    ZIP: results.zip,
                    Region: results.region,
                    Country: results.country
                };  
            }
        });
        
        //products
        let query = `select products.id, name, price, quantity, currency from products, listproducts 
        where prod_id = listproducts.id and order_id = ${id};`
        await API.raw(query, res)
        .then(results => {
            results[0].forEach(el => {
                OrderList.products.push({
                    id: el.id,
                    quantity: el.quantity,
                    name: el.name,
                    price: el.price,
                    currency: el.currency,
                    totalPrice: (Number(el.quantity) * Number(el.price))
                });
            });
        });

        console.log(OrderList)
        await res.json(OrderList);
    })
    
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
    let input = req.query.i;
    let id = req.query.id;
    let ItemsList= [];
    
    let query = `select products.id, name, price, quantity, currency from products, listproducts 
    where prod_id = listproducts.id and order_id = ${id};`
    API.raw(query, res)
    .then(results => {
        if(results[0]){
            results[0].forEach(element => {
                for(e in element){
                    element[e] = element[e] == null? '' : element[e];
                };

                if((element.id.toString().indexOf(input) + 1) 
                || (element.name.toLowerCase().indexOf(input.toLowerCase()) + 1) 
                || (element.price.toString().indexOf(input) + 1) 
                || (((Number(element.quantity) * Number(element.price))).toString().indexOf(input) + 1) 
                || (element.currency.indexOf(input) + 1) 
                || (element.quantity.toString().toLowerCase().indexOf(input.toLowerCase()) + 1)){
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
        }

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
