const WebSocket = require('ws');

const HOST = 'localhost';
const wsserv = new WebSocket.Server({port: 4004, host: HOST});
let log = process.stdout;

let WS = ()=>{
    wsserv.on('connection', (ws) =>{    
    
        ws.on('message', message =>{
            let data = JSON.parse(message);
            if(data){
                log.write(`x:${data.x}, y:${data.y}\n`);
                ws.send(JSON.stringify({x: data.x, y: data.y, z: data.x + data.y}));
            }
        });
    })
    .on('error', (e)=> {log.write('WS server error\n', e);});
    
}

module.exports = WS;