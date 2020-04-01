var url = require("url");
const http = require('http');
const API = require('./Handlers/Api_Handler');
let rt = require('./routing');

const PORT = 3000;

let http_handler = (req, res)=>{
    switch (req.method){
        case 'GET': GET_handler(req, res);  break;
        case 'POST': POST_handler(req, res);  break;
        case 'PUT': PUT_handler(req, res);  break;
        case 'DELETE': DELETE_handler(req, res);  break;
        default: rt.HTTP405(req, res);  break;
    }
};
  

let GET_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;
    switch ('/'+rt.GetUrlPart(Path_forGet, 1)){
        case '/api':
            if(!rt.GetUrlPart(Path_forGet, 3)){
                let tab = rt.GetUrlPart(Path_forGet, 2);
                API.get(tab, res);
            }
            else{
                rt.HTTP404(req, res);
            }
        break;
        default: rt.HTTP404(req, res);  break;
    }
};


//-----POST------
let POST_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;
    switch ('/'+rt.GetUrlPart(Path_forGet, 1)){
        case '/api':
            if(!rt.GetUrlPart(Path_forGet, 3)){
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end', async () => {
                    let tab = rt.GetUrlPart(Path_forGet, 2);
                    API.post(tab, body, res);
                });
            }
            else{
                rt.HTTP404(req, res);
            }
        break;
        default: rt.HTTP404(req, res);  break;
    }
};


//-----PUT------
let PUT_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;
    switch ('/'+rt.GetUrlPart(Path_forGet, 1)){
        case '/api':
            if(!rt.GetUrlPart(Path_forGet, 3)){
                let body = ' ';
                req.on('data', chunk => {
                    body = chunk.toString();
                    body = JSON.parse(body);
                });
                req.on('end', async () => {
                    let tab = rt.GetUrlPart(Path_forGet, 2);
                    API.put(tab, body, res);
                });
            }
            else{
                rt.HTTP404(req, res);
            }
        break;
        default: rt.HTTP404(req, res);  break;
    }
};


//-----DELETE------
let DELETE_handler = (req, res)=>{
    let Path_forGet = url.parse(req.url, true).pathname;
    switch ('/'+rt.GetUrlPart(Path_forGet, 1)){
        case '/api':
            if(!rt.GetUrlPart(Path_forGet, 4)){
                let tab = rt.GetUrlPart(Path_forGet, 2);
                let id = rt.GetUrlPart(Path_forGet, 3);
                API.delete(tab, id, res);
            }
            else{
                rt.HTTP404(req, res);
            }
        break;
        default: rt.HTTP404(req, res);  break;
    }
};



const server = http.createServer().listen(PORT, (v) =>{
    console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`${URL} | error: ${e.code}`)})
.on('request', http_handler);