const WebSocket = require('ws');
const fs = require('fs');

let socket = new WebSocket('ws:/localhost:4005');
let log = process.stdout;

socket.onopen = () =>{
    const duplex = WebSocket.createWebSocketStream(socket, {encoding: 'utf8'});
    let uf = fs.createReadStream(__dirname + `/files/file.txt`);
    uf.pipe(duplex);
};
socket.onclose = () => {log.write(`Socket closed\n`);};
socket.onmessage = (e) => {log.write(`message: ${e.data}\n`);};
socket.onerror = (e) => {log.write(`Error: ${e.message}\n`);};