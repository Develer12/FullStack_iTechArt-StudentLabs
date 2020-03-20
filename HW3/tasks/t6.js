const express = require('express');
const Route = express.Router();
const xmlBodyParser = require('express-xml-bodyparser');
var xml2json = require('xml-js');

Route.use(xmlBodyParser());

Route.post('/', (req, res)=>{
    res.writeHead(200, {'Content-Type': 'application/xml; charset=utf-8'});
    let answer;

    if(req.headers['content-type'] == 'application/xml'){
        let options = {compact: true};
        answer = xml2json.json2xml(req.body, options);
    }
    else{
        answer = `Wrong content-type`;
    }

    res.end(`<SERVER>${answer}</SERVER>`);
});
  

module.exports = Route;