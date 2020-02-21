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

app.get('/api/orders/:n', (req, res) =>{ 
    let id = req.params.n;  
    console.log("Get OrderList n");
    let OrderList= [];
    data.forEach(element => {
        if(element.id == id)
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


app.listen(PORT, () =>{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});