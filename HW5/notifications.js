const WebSocket = require('ws');
const fs = require('fs');

const HOST = 'localhost';
const wsserv = new WebSocket.Server({port: 4000, host: HOST, path: '/notif'});

let WS = ()=>{
    wsserv.on('connection', (ws) =>{ 
        consoel.log('WS-notifications server connected');   
    })
    .on('error', (e)=> {consoel.log('WS server error:', e);});
}

let k = 0;
fs.watch(`${__dirname}/backups`, (event, fname)=>{
    if(fname){
        if(event == 'change'){
            if(++k != 2){
                sendBroad(fname, event);
            }
            else{
                k = 0;
            }
        }
        else{
            sendBroad(fname, event);
        }
    }
});

function sendBroad(fname, event){
    wsserv.clients.forEach((client)=>{
        if(client.readyState === WebSocket.OPEN){
            client.send(fname+' '+event);
        }
    });  
}

module.exports = WS;