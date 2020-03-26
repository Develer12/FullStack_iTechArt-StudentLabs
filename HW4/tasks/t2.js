const rt = require('../routing');
let url = require('url');
let fs = require('fs');
const WebSocket = require('ws');

const HOST = 'localhost';
const wsserv = new WebSocket.Server({port: 4001, host: HOST, path: '/t2'});
let log = process.stdout;

clientsList = [];

wsserv.on('connection', (ws) =>{
    let ip = ws._socket.remoteAddress;

    log.write(`WS connection for: ${ip}\n`);
    clientsList.push(ws);

    ws.on('pong', (data)=>{
        if(data == 'alive?'){
            let isActive = clientsList.find(client => ws == client);
            if(isActive){
                console.log('act')
            }
            else{
                console.log('dead')

                clientsList.filter(client => ws != client);
            }
            console.log(clientsList.length);
        }
    });

    ws.on('message', message =>{
        log.write(`${ip}: ${message}\n`);
        ws.send(message);
    });
})
.on('error', (e)=> {log.write('WS server error\n', e);});
let timer = setInterval(()=> sendBroad(), 5000);

function sendBroad(){
    wsserv.clients.forEach((client)=>{
        client.ping('alive?');
        if(client.readyState === WebSocket.OPEN){
            let isActive = clientsList.find(ws => ws == client);
            if(isActive){

            }
            else{
                clientsList.filter(ws => ws != client);
            }
        }
    });  
}

module.exports = {
    get: (req, res)=>{
        let params = url.parse(req.url, true).query;
        let getUrl = url.parse(req.url, true).pathname;

        if(!rt.GetUrlPart(getUrl, 3)){
            switch ('/'+rt.GetUrlPart(getUrl, 2)){
                case '/':{
                    res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                    res.end(fs.readFileSync(__dirname + '/static/t2.html'));
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
