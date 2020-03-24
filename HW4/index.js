const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use('/',express.static(__dirname ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use('/static',express.static(__dirname + '/tasks/static'));


const PORT = 3000;

app.use('/t1', require(__dirname + '/tasks/t1'));



app.listen(PORT, () =>{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`error: ${e.code}`)});