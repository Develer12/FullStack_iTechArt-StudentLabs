module.exports = {
    sum: (res, x, y) => {
        if(x && y){
            let z = x + y;
    
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${x} + ${y} = ${z}`);
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`Input valid values`);
        }
    },
    sub: (res, x, y) => {
        if(x && y){
            let z = x - y;
    
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${x} - ${y} = ${z}`);
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`Input valid values`);
        }
    },
    conc: (res, x, y) => {
        if(x && y){
            let z = x + y;
    
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`${x} + ${y} = ${z}`);
        }
        else{
            res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(`Input valid values`);
        }
    },
    cancel: (res) => {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`CANCEL`);
    },
    send: (res) => {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`Файл получен`);
    },
};
