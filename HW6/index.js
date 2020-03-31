const Db = require('./queries');
const fs = require('fs');
var url = require("url");
const http = require('http');
const DB = new Db();

const PORT = 3000;

let HTTP404 = (req, res) =>{
    console.log(`${req.method}: ${req.url}, HTTP status 404`);
    res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end(`"error" : "${req.method}: ${req.url}, HTTP status 404"`);
}

let HTTP405 = (req, res) =>{
    console.log(`${req.method}: ${req.url}, HTTP status 405`);
    res.writeHead(404, {'Content-Type' : 'application/json; charset=utf-8'});
    res.end(`Error" : "${req.method}: ${req.url}, HTTP status 405"`);
}

let http_handler = (req, res)=>{
  switch (req.method){
    case 'GET': GET_handler(req, res);  break;
    case 'POST': POST_handler(req, res);  break;
    case 'PUT': PUT_handler(req, res);  break;
    case 'DELETE': DELETE_handler(req, res);  break;
    default: HTTP405(req, res);  break;
  }
};

let GET_handler = (req, res)=>{
  let Path_forGet = url.parse(req.url, true).pathname;
  console.log('URL: /'+ GetUrlPart(Path_forGet, 1));
  switch ('/'+GetUrlPart(Path_forGet, 1)){
    case '/':
      res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
      res.end(fs.readFileSync(__dirname + '/index.html'));
    break;
    case '/api':
      let tab = GetUrlPart(Path_forGet, 2);
      console.log(`Get ${tab}`);
      res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
      DB.Get(tab).then(records =>{
        res.end(JSON.stringify(records.recordset));
      })
      .catch(error =>{
        res.statusCode = 400;
        res.end(JSON.stringify({error: String(error)}));
      });
    break;
    default: HTTP404(req, res);  break;
  }
};

let POST_handler = (req, res)=>{
  let Url_forGet = req.url;
  let Path_forGet = url.parse(req.url, true).pathname;
  console.log('URL: /'+ GetUrlPart(Path_forGet, 1));
  switch ('/'+GetUrlPart(Path_forGet, 1)){
    case '/api':
      let body = ' ';
      req.on('data', chunk => {
        body = chunk.toString();
        body = JSON.parse(body);
      });
      req.on('end', async () => {
        let tab = GetUrlPart(Path_forGet, 2);
        console.log(`Post ${tab}`);
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        DB.Insert(tab, body)
        .then(record =>{
          res.end(JSON.stringify({msg: 'Value added'}));
        })
        .catch(error =>{
            res.statusCode = 400;
            res.end(JSON.stringify({error: String(error)}));
        });
      });
    break;
    default: HTTP404(req, res);  break;
  }
};

let PUT_handler = (req, res)=>{
  let Url_forGet = req.url;
  let Path_forGet = url.parse(req.url, true).pathname;
  console.log('URL: /'+ GetUrlPart(Path_forGet, 1));
  switch ('/'+GetUrlPart(Path_forGet, 1)){
    case '/api':
      let body = ' ';
      req.on('data', chunk => {
            body = chunk.toString();
            body = JSON.parse(body);
      });
      req.on('end', async () => {
        let tab = GetUrlPart(Path_forGet, 2);
        console.log(`Put ${tab}`);
        console.log(JSON.stringify(body));
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        DB.Update(tab, body).then(record =>{
          res.end(JSON.stringify({msg: 'Value updated'}));
        })
        .catch(error =>{
            res.statusCode = 400;
            res.end(JSON.stringify({error: String(error)}));
        });
      });
    break;
    default: HTTP404(req, res);  break;
  }
};

let DELETE_handler = (req, res)=>{
  let Url_forGet = req.url;
  let Path_forGet = url.parse(req.url, true).pathname;
  console.log(Path_forGet + ' | ' + Url_forGet);
  console.log('URL: /'+ GetUrlPart(Path_forGet, 1));
  switch ('/'+GetUrlPart(Path_forGet, 1)){
    case '/api':
      let body = ' ';
      req.on('data', chunk => {
            body = chunk.toString();
            body = JSON.parse(body);
      });
      req.on('end', async () => {
        let tab = GetUrlPart(Path_forGet, 2);
        console.log(`Delete ${tab}`);
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});
        DB.Delete(tab, GetUrlPart(Path_forGet, 3))
          .then(record => res.end(JSON.stringify({msg: 'Value deleted'})))
          .catch(error =>{
          res.statusCode = 400;
          res.end(JSON.stringify({error: String(error)}));
          });
      });
    break;
    default: HTTP404(req, res);  break;
  }
};


function GetUrlPart(url_path, indx){
  let i = 0;
  let curr_url = '';
  i--;
  decodeURI(url_path).split('/').forEach(e =>{
    i++;
    if(i == indx){
      curr_url = e;
      return;
    }
  });
  return curr_url?curr_url:'';
}

const server = http.createServer().listen(PORT, (v) =>
{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)})
.on('request', http_handler);