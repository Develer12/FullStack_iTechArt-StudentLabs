const WebSocket = require('ws');
const fs = require('fs');

let socket = new WebSocket('ws:/localhost:4006');
let log = process.stdout;
let k = 1;

socket.on('open', () =>{
    const duplex = WebSocket.createWebSocketStream(socket, {encoding: 'utf8'});

    fs.readdir(__dirname + '/files/', (err, files) =>
    {
        if (err) throw err;
        let i = 0;
        files.forEach(file =>{    
            let rex = new RegExp('(.*?).txt', "gmi");
            while(re = rex.exec(file)){ fname=re[1];}
            if(Number.isInteger(Number(fname))){
                files[i++] = fname;
            }
        });

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
});
socket.onclose = () => {log.write(`Socket closed\n`);};
socket.onerror = (e) => {log.write(`Error: ${e.message}\n`);};