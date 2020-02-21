const fs = require('fs');
const express = require('express');
let data = require('./data/data.js');
const bodyParser = require('body-parser')

const app = express();
app.use(bodyParser.json());

const PORT = 3000;


app.get('/orders', (req, res) =>
{
    res.sendFile(__dirname + '/index.html');
});

app.get('/api/orders', (req, res) =>
{   
    console.log(data.Orders);
});


app.listen(PORT, () =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)});