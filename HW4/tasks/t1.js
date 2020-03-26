const rt = require('../routing');
let url = require('url');
let fs = require('fs');
const WebSocket = require('ws').Server;

const HOST = 'localhost';
const wsserv = new WebSocket({port: 4000, host: HOST, path: '/t1'});
let log = process.stdout;


module.exports = {
    get: (req, res)=>{
        let params = url.parse(req.url, true).query;
        let getUrl = url.parse(req.url, true).pathname;

        if(!rt.GetUrlPart(getUrl, 3)){
            switch ('/'+rt.GetUrlPart(getUrl, 2)){
                case '/':{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(fs.readFileSync(__dirname + '/static/t1.html'));
                    break;
                }
                default: rt.HTTP404(req, res);  break;
            }
        }
        else{
            rt.HTTP404(req, res);
        }
    }
};

wsserv.on('connection', (ws) =>{
    let k = 0;

    log.write(`WS connection for: ${ws._socket.remoteAddress}\n`);

    ws.on('message', message =>{
        log.write(`client: ${message}\n`);
    });

    let timer = setInterval(()=> ws.send(`server: message->${k++}`), 3000);
})
.on('error', (e)=> {log.write('WS server error\n', e);});