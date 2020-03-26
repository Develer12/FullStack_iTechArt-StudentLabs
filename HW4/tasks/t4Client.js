const WebSocket = require('ws');

let socket = new WebSocket('ws:/localhost:4004');

let log = process.stdout;
let timer;
let a = 0;
let b = 100;

socket.onopen = () =>{
    timer = setInterval(()=>{
        socket.send(JSON.stringify({x: ++a, y: --b}))
    }, 500);
    setTimeout(() => clearInterval(timer), 10000);
    setTimeout(() => socket.close(), 20000);
};
socket.onclose = () => {log.write(`Socket closed\n`);};
socket.onmessage = (e) => {log.write(`message: ${e.data}\n`);};
socket.onerror = (e) => {log.write(`Error: ${e.message}\n`);};