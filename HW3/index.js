const fs = require('fs');
const rt = require(__dirname + '/routing');
let url = require('url');
const http = require('http');

const PORT = 40001;
let http_handler = (req, res)=>
{
    switch (req.method)
    {
        case 'GET': GET_handler(req, res);  break;
        case 'POST': POST_handler(req, res);  break;
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
        case '/t3':
            require(__dirname + '/tasks/t3').get(req, res);
        break;
        case '/t7':
            require(__dirname + '/tasks/t7').get(req, res);
        break;
        case '/t8':
            require(__dirname + '/tasks/t8').get(req, res);
        break;
        case '/t9':
            require(__dirname + '/tasks/t9').get(req, res);
        break;
        case '/static':
            let Name = rt.GetUrlPart(getUrl, 2);
            let path = `${__dirname}/tasks/static/${Name}`;
            if(fs.existsSync(path)){
                res.end(fs.readFileSync(path));
            }
            else{
                res.end('File not found');
            }
        break;
        default: rt.HTTP404(req, res);  break;
  }
};

let POST_handler = (req, res)=>{
    let getUrl = url.parse(req.url, true).pathname;
    switch ('/'+rt.GetUrlPart(getUrl, 1)){
        case '/t1':
            require(__dirname + '/tasks/t1').post(req, res);
        break;
        case '/t3':
            require(__dirname + '/tasks/t3').post(req, res);
        break;
        case '/t4':
            require(__dirname + '/tasks/t4').post(req, res);
        break;
        case '/t5':
            require(__dirname + '/tasks/t5').post(req, res);
        break;
        case '/t6':
            require(__dirname + '/tasks/t6').post(req, res);
        break;
        case '/t7':
            require(__dirname + '/tasks/t7').post(req, res);
        break;
        default: rt.HTTP404(req, res);  break;
    }
};


const server = http.createServer()
.listen(PORT, (v) =>{
  console.log(`Listening on http://localhost:${PORT}`);
})
.on('error', (e) => {console.log(`error: ${e.code}`)})
.on('request', http_handler);
