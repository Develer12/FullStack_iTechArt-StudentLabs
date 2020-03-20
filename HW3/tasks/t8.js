const express = require('express');
const Route = express.Router();
const fs = require('fs');


Route.get('/download/:file', (req, res)=>{
    filename = req.params.file;
    let path = __dirname + '/files/' + filename;
    
    if(!fs.existsSync(path)){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`Wrong file name`);
    }
    else{
      res.download(path);
    }
});


module.exports = Route;