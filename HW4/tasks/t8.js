const RPCsoc = require('rpc-websockets').Server;

const HOST = 'localhost';
const eventSocket = new RPCsoc({port: 4008, host: HOST});
let log = process.stdout;

let RPC = ()=>{
    eventSocket.event('AAA');
    eventSocket.event('BBB');
    eventSocket.event('CCC');

    let input = process.stdin;
    input.setEncoding('utf-8');
    log.write('t8> ');
    input.on('data', data => {
        if(data.length == 3){
            data = data.slice(0, 3);
            log.write(`|${data}|\n`);
            eventSocket.emit(data);
            log.write('t8> ');
        }
    });
}

module.exports = RPC;