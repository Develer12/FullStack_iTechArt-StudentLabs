const WebSocket = require('ws');
const fs = require('fs');

const HOST = 'localhost';
const wsserv = new WebSocket.Server({port: 4005, host: HOST});
let log = process.stdout;
let k = 1;

let WS = ()=>{
    wsserv.on('connection', (ws) =>{    
        const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'});
        fs.readdir(__dirname + '/files/', (err, files) =>
        {
            if (err) throw err;

            files.forEach(file =>{    
                let rex = new RegExp('(.*?).txt', "gmi");
                while(re = rex.exec(file)){ fname=re[1];}
                if(Number.isInteger(Number(fname))){
                    files[i++] = fname;
                }
            })
    
            files.sort((a, b) => {
                if(Number.isInteger(Number(a)) || Number.isInteger(Number(b))){
                    if(Number.isInteger(Number(a)) && Number.isInteger(Number(b))){
                        return a - b;
                    }
                    else{
                        return a > b ? 1 : -1;
                    }
                }
                else{
                    return a > b ? 1 : -1;
                }
            })
            .forEach(file =>{
                if (Number(file) && file == k){
                    ++k;
                }
            });

            let uf = fs.createWriteStream(__dirname +`/files/${k++}.txt`);
            duplex.pipe(uf);
        });
    })
    .on('error', (e)=> {log.write('WS server error\n', e);});
    
}

module.exports = WS;