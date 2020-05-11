const express = require('express');
const Route = express.Router();
const API = require(__dirname + '/../../../models/DB/DB_API');


//Get order list products
Route.get('/', (req, res)=>{
    let List= [];
    API.get('listproduct', res)
    .then(results => {
        results.forEach(el => {
            List.push({
                id: el.id,
                name: el.name,
                price: el.price,
                currency: el.currency,
            });
        });

        res.json(List);
    });
});

//Get order full list products
Route.get('/full', (req, res)=>{
    let List= [];
    API.get('product', res)
    .then(results => {
        results.forEach(el => {
            List.push({
                id: el.id,
                quantity: el.quantity,
                order_id: el.order_id,
                prod_id: el.prod_id
            });
        });

        res.json(List);
    });
});

//Search order products
Route.get('/search', (req, res) =>{
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
Route.post('/:order_id(\\d+)/', (req, res)=>{
    let body = {
        order_id: req.params.order_id,
        prod_id: req.body.id,
        quantity: req.body.quantity
    };
    API.post('product', body, res);
});

Route.put('/:order_id(\\d+)/', (req, res)=>{
    let item = req.body.prod_id;
    let order = req.params.order_id;
    let body = {
        prod_id: req.body.id,
        quantity: req.body.quantity,
        update_id: {id: item, order_id: order}
    };
    API.put('product', body, res);
});

Route.delete('/:item_id(\\d+)/:order_id(\\d+)/', (req, res)=>{
    let item = req.params.item_id;
    let order = req.params.order_id;
    API.delete('product', {id: item, order_id: order}, res);
});


module.exports = Route;