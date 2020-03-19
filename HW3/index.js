const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use('/',express.static(__dirname ));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const PORT = 40001;

app.use('/t1', require(__dirname + '/tasks/t1'));
app.use('/t2', require(__dirname + '/tasks/t2'));
app.use('/t3', require(__dirname + '/tasks/t3'));


app.listen(PORT, () =>{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`error: ${e.code}`)});