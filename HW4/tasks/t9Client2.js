const rpc = require('rpc-websockets').Client;
let log = process.stdout;

const notificationSocket = new rpc('ws://localhost:4009');
notificationSocket.on('open', () => {
    let timer = setInterval(()=> {
        notificationSocket.notify('N2');
    }, 500);
    setTimeout(() => clearInterval(timer), 10000);
});