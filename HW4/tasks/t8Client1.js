const rpc = require('rpc-websockets').Client;
let log = process.stdout;

const eventSocket = new rpc('ws://localhost:4008');
eventSocket.on('open', () => {
    eventSocket.subscribe('AAA');
    eventSocket.subscribe('BBB');
    eventSocket.on('AAA', () => log.write('AAA event was fired'));
    eventSocket.on('BBB', () => log.write('BBB event was fired'));
});