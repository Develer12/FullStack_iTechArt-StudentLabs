const WebSocket = require('ws'); //подключение модуля вебсокета

const ws = new WebSocket('ws://localhost:4001/t2'); //подключение сокета по заданному адресу
let log = process.stdout;

ws.on('open', () =>{ //событие вызываемое при успешном открытии сокета
    log.write(`Socket connected\n`);

    const duplex = WebSocket.createWebSocketStream(ws, {encoding: 'utf8'}); //создание потока ("трубы") сокета для передачи данных

    duplex.pipe(process.stdout); //вывод данных в консоль, оправляемых сервером
    process.stdin.pipe(duplex); //ввод данных из консоль и отправка их по "трубе" на сервер
})
.on('close', () => { //событие вызываемое при закрытии сокета
    log.write(`Socket closed\n`);
})
.on('error', (e)=> { //событие вызываемое при ошибке сокета
    log.write(`WS server error:\n ${e} \n`);
});