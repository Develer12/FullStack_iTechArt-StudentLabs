const WebSocket = require('ws');
const fs = require('fs');

const HOST = 'localhost';
const wsserv = new WebSocket.Server({port: 4006, host: HOST});
let log = process.stdout;
let k = 0;

let WS = ()=>{
    wsserv.on('connection', (ws) =>{  
        const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});
        let uf = fs.createReadStream(__dirname + `/files/file.txt`);
        uf.pipe(duplex);
    })
    .on('error', (e)=> {log.write('WS server error\n', e);});
    
}

module.exports = WS;