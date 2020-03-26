const rpc = require('rpc-websockets').Client;
let log = process.stdout;

const eventSocket = new rpc('ws://localhost:4008');
eventSocket.on('open', () => {
    eventSocket.subscribe('CCC');
    eventSocket.on('CCC', () => log.write('CCC event was fired'));
});