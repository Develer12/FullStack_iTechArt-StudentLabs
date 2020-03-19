module.exports = {
    sum: (res, x, y) => {
        let z = x + y;
    
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${x} + ${y} = ${z}`);
    },
    sub: (res, x, y) => {
        let z = x - y;
    
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${x} - ${y} = ${z}`);
    },
    conc: (res, x, y) => {
        let z = x + y;
    
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`${x} + ${y} = ${z}`);
    },
    cancel: (res) => {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`CANCEL`);
    },

};
