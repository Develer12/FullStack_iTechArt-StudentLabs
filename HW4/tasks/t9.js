const RPCsoc = require('rpc-websockets').Server;

const HOST = 'localhost';
const notificationSocket = new RPCsoc({port: 4009, host: HOST});
let log = process.stdout;

let RPC = ()=>{
    notificationSocket.register('N1', () => log.write('Notification N1\n')).public();
    notificationSocket.register('N2', () => log.write('Notification N2\n')).public();
}

module.exports = RPC;