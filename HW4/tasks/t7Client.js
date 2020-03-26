const rpc = require('rpc-websockets').Client;
let log = process.stdout;

const wsrpc = new rpc('ws://localhost:4007');
wsrpc.on('open', () =>
{
    wsrpc.call('sum', [3, 5])
        .then(answer => log.write(`sum: ${answer}\n`))
        .catch(error =>{log.write(`ERROR: ${JSON.stringify(error)}\n`)});

    wsrpc.call('mul', [3, 5, 7])
        .then(answer => log.write(`mul: ${answer}\n`))
        .catch(error =>{log.write(`ERROR: ${JSON.stringify(error)}\n`)});
        
    wsrpc.login({login: 'admin', password: 'admin'})
      .then(async login =>
      {
          if (login){
            wsrpc.call('conc', ['da', ' ', 'net'])
            .then(answer => log.write(`conc: ${answer}\n`));
          }
          else{
            log.write('Unauthorized');
          }
      })
      .catch(error =>{log.write(`ERROR: ${JSON.stringify(error)}\n`)});
});