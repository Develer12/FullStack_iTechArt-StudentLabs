const fs = require('fs');
const express = require('express');
let data = require('./resourse/data/data').Orders;
const bodyParser = require('body-parser')

const app = express();
app.use('/',express.static(__dirname ));
app.use(bodyParser.json());

const PORT = 3000;


app.get('/orders', (req, res) =>{
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/orders', (req, res) =>{  
    console.log("Get OrderList");
    let OrderList= [];
    data.forEach(element => {
        OrderList.push( {
            id: element.id, 
            createdAt: element.OrderInfo.createdAt,
            customer: element.OrderInfo.customer,
            status: element.OrderInfo.status,
            shippedAt: element.OrderInfo.shippedAt
        });
    });
    res.json(OrderList);
});

app.get('/api/orders/search', (req, res) =>{   
    let input = req.query.i; 
    let OrderList= [];
    data.forEach(element => {
        if((element.id.indexOf(input) + 1) || 
        (element.OrderInfo.createdAt.indexOf(input) + 1) ||
        (element.OrderInfo.customer.toLowerCase().indexOf(input.toLowerCase()) + 1) || 
        (element.OrderInfo.status.toLowerCase().indexOf(input.toLowerCase()) + 1) ||
        (element.OrderInfo.shippedAt.indexOf(input) + 1))
            OrderList.push({
                id: element.id, 
                createdAt: element.OrderInfo.createdAt,
                customer: element.OrderInfo.customer,
                status: element.OrderInfo.status,
                shippedAt: element.OrderInfo.shippedAt
            });
    });
    res.json(OrderList);
});

app.get('/api/orders/items/search', (req, res) =>{   
    let input = req.query.i;
    let id = req.query.id;  
    let ItemsList= [];
    data.forEach(element => {
        if(element.id == id)
            element.products.forEach(elem => {
                if((elem.id.indexOf(input) + 1) || 
                (elem.name.toLowerCase().indexOf(input.toLowerCase()) + 1) || 
                (elem.price.indexOf(input) + 1) ||
                (elem.totalPrice.indexOf(input) + 1) || 
                (elem.currency.indexOf(input) + 1) ||
                (elem.quantity.toLowerCase().indexOf(input.toLowerCase()) + 1))
                    ItemsList.push({
                        id: elem.id,
                        name: elem.name,
                        price: elem.price,
                        totalPrice: elem.totalPrice,
                        quantity: elem.quantity,
                        currency: elem.currency
                    });
            });
    });
    res.json(ItemsList);
});

app.get('/api/orders/:n', (req, res) =>{ 
    let id = req.params.n;  
    console.log("Get OrderList " + id);
    let OrderList;
    data.forEach(element => {
        if(element.id == id)
            OrderList = {
                id: id,
                OrderInfo: element.OrderInfo, 
                ShipTo: element.ShipTo,
                ProcessorInfo: element.ProcessorInfo,
                CustomerInfo: element.CustomerInfo,
                products: element.products
            };
    });
    res.json(OrderList);
});


app.listen(PORT, () =>{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});