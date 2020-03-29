const WebSocket = require('ws');

let socket = new WebSocket('ws:/localhost:4001/t2');
let timer;
let clientId;
let log = process.stdout;
let k = 0;

socket.onopen = () =>{
    log.write(`Socket opened\n`);
    timer = setInterval(()=>{
        if(clientId){
            socket.send(`Id${clientId}: ${++k} msg`);
        }
    }, 3000);
};
socket.onclose = () => {
    clearInterval(timer);
    socket.close();
    log.write(`Socket closed\n`);
};
socket.onmessage = (e) => {
    let clid;
    let rex = new RegExp('Id(.*?) ws', "gmi");
    while(re = rex.exec(e.data)){ clid=re[1];}

    let id;
    rex = new RegExp('(.*?) cl', "gmi");
    while(re = rex.exec(e.data)){ id=re[1];}
    if(e.data == 'new list'){
        log.write(`${e.data}\n`);
    }
    else if(id){
        log.write(`Active client: ${id}\n`)
    }
    else if(clid){
        clientId = clid;
        socket.send(`Id${clientId} ws`);
    }
    else{
        log.write(`${e.data}\n`);
        socket.send(e.data);
    }
};
socket.on('ping', (data)=>{
    log.write(`${data}\n`);

    socket.ping(clientId);
});
socket.onerror = (e) => {log.write(`Error: ${e.message}\n`);};