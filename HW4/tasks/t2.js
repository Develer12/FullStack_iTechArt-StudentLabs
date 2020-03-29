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

    let clientId = ws._socket[Object.getOwnPropertySymbols(ws._socket)[2]];
    clientId = clientId[Object.getOwnPropertySymbols(clientId)[2]];
    clientsList.push({id: clientId});


    log.write(`WS connection\n`);
    ws.send(`Id${clientId} ws`);
    
    sendBroad();

    ws.on('pong', (data)=>{
        if(data){
            log.write(`Active ping/pong by ${clientId}\n`);
        }
    });

    ws.on('message', message =>{
        let clid;
        let rex = new RegExp('Id(.*?) ws', "gmi");
        while(re = rex.exec(message)){ clid=re[1];}
        if(clid){
            let isActive = clientsList.find(client => clid == client.id);
            if(!isActive){
                clientsList.push({id: clid});
            }
        }
        else{
            ws.send(message);
        }
    });
})
.on('error', (e)=> {log.write('WS server error\n', e);});
let timerBroad = setInterval(()=> sendBroad(), 5000);
let timerAlive = setInterval(()=> checkAlive(), 5000);

function sendBroad(){
    wsserv.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN){
            client.send('new list');
            clientsList.forEach(cl =>{  
                client.send(`Id${cl.id} cl`);
            });
        }
    });  
}

function checkAlive(){
    clientsList.length = 0;

    wsserv.clients.forEach((client)=>{
        let clientId = client._socket[Object.getOwnPropertySymbols(client._socket)[2]];
        clientId = clientId[Object.getOwnPropertySymbols(clientId)[2]];

        client.send(`Id${clientId} ws`);

        client.ping('alive?');
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
