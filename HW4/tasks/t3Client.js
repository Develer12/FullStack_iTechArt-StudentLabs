const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:4001/t2');

ws.on('connection', (ws) =>
{
    console.log('Download started');
    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});

    duplex.pipe(process.stdout);
    process.stdin.pipe(duplex);

    let uf = fs.createReadStream(__dirname +`/files/file.txt`);
    uf.pipe(duplex);
})
.on('error', (e)=> {console.log('WS server error ', e);});