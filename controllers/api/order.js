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

Route.get('/:n(\\d+)/', (req, res) =>{ 
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
                OrderList.ShipTo = {
                    id: results.id,
                    Address: results.address,
                    ZIP: results.zip,
                    Region: results.region,
                    Country: results.country
                };  
            }
        });
        
        //products
        let query = `select products.id, prod_id, name, price, quantity, currency from products, listproducts 
            where prod_id = listproducts.id and order_id = ${id};`
        await API.raw(query, res)
        .then(results => {
            results[0].forEach(el => {
                OrderList.products.push({
                    id: el.prod_id,
                    list: el.id,
                    quantity: el.quantity,
                    name: el.name,
                    price: el.price,
                    currency: el.currency,
                    totalPrice: (Number(el.quantity) * Number(el.price))
                });
            });
        });

        await res.json(OrderList);
    })
    
});

//Edit order
Route.post('/', (req, res)=>{
    API.post('order', req.body, res);
});

Route.put('/', (req, res)=>{
    req.body.update_id = { id: req.body.id};
    API.put('order', req.body, res);
});

Route.delete('/:order_id(\\d+)/', (req, res)=>{
    let id = req.params.order_id;
    
    API.delete('order', {id: id}, res);
});


////////////////////////////////////////////////////////////////////////////////////
///////////////////////////              ORDER ELEMENTS             ////////////////
const processor = require(__dirname + '/orderElements/processor');
const ship = require(__dirname + '/orderElements/ship');
const address = require(__dirname + '/orderElements/address');
const item = require(__dirname + '/orderElements/products');
const itemlist = require(__dirname + '/orderElements/listproducts');

Route.use('/process', processor);
Route.use('/ship', ship);
Route.use('/address', address);
Route.use('/item', item);
Route.use('/itemlist', itemlist);


module.exports = Route;
