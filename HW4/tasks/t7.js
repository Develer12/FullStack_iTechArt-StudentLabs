const RPCsoc = require('rpc-websockets').Server;

const HOST = 'localhost';
const wsrpc = new RPCsoc({port: 4007, host: HOST});


let RPC = ()=>{
    wsrpc.setAuth(credentials => credentials.login === 'admin' && credentials.password === 'admin');
    wsrpc.register('sum', params => {
        if(params.length < 3){
            let a = Number(params[0]);
            let b = Number(params[1]);
            if(a && b){ return a + b}
            else{ return 'invalid data'}
        }
        else{ return 'too much parameters'}
    }).public();

    wsrpc.register('mul', params => params.reduce((a, b) =>{
        a = Number(a);
        b = Number(b);
        if(a && b){ return a * b}
        else{ return 'invalid data'}
    }, 1)).public();

    wsrpc.register('conc', params => {
        if(params.length < 4){
            let a = params[0];
            let b = params[1];
            let c = params[2];
            if(a && b){ return a + b + c}
            else{ return 'invalid data'}
        }
        else{ return 'too much parameters'}
    }).protected();
}

module.exports = RPC;