const rt = require(__dirname + '/routing');
let url = require('url');
const http = require('http');

const PORT = 3000;


let http_handler = (req, res)=>
{
    switch (req.method)
    {
        case 'GET': GET_handler(req, res);  break;
        default: rt.HTTP405(req, res);  break;
    }
};

let GET_handler = (req, res)=>{
    let getUrl = url.parse(req.url, true).pathname;
    switch ('/'+rt.GetUrlPart(getUrl, 1)){
        case '/t1':
            require(__dirname + '/tasks/t1').get(req, res);
        break;
        case '/t2':
            require(__dirname + '/tasks/t2').get(req, res);
        break;
        default: rt.HTTP404(req, res);  break;
  }
};


const server = http.createServer()
.listen(PORT, (v) =>{
    console.log(`Listening on http://localhost:${PORT}`);
    let t4 = require(__dirname + '/tasks/t4')();
    let t5 = require(__dirname + '/tasks/t5')();
    let t6 = require(__dirname + '/tasks/t6')();
    let t7 = require(__dirname + '/tasks/t7')();
    let t8 = require(__dirname + '/tasks/t8')();
    let t9 = require(__dirname + '/tasks/t9')();
})
.on('error', (e) => {console.log(`error: ${e.code}`)})
.on('request', http_handler);
