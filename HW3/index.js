const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use('/',express.static(__dirname ));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json());

const PORT = 40001;

app.use('/t1', require(__dirname + '/tasks/t1'));
app.use('/t2', require(__dirname + '/tasks/t2'));
app.use('/t3', require(__dirname + '/tasks/t3'));
app.use('/t4', require(__dirname + '/tasks/t4'));
app.use('/t5', require(__dirname + '/tasks/t5'));
app.use('/t6', require(__dirname + '/tasks/t6'));
app.use('/t7', require(__dirname + '/tasks/t7'));
app.use('/t8', require(__dirname + '/tasks/t8'));


app.listen(PORT, () =>{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`error: ${e.code}`)});