const express = require('express');
const Route = express.Router();
const WebSocket = require('ws');

const HOST = 'localhost';
const wsserv = new WebSocket.Server({port: 4000, host: HOST, path: '/t1'});

wsserv.on('connection', (ws) =>
{
    let k = 0;

    console.log('WS connection');

    ws.on('message', message =>
    {
        console.log(`client: ${message}`);
    });

    let timer = setInterval(()=> ws.send(`server: message->${k++}`), 3000);
})
.on('error', (e)=> {console.log('WS server error ', e);});


Route.get('/', (req, res)=>{
    res.sendFile(__dirname + '/static/t1.html');
});


module.exports = Route;