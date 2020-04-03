const db = require('./DB_Handler');
const DB = new db();


module.exports = {
    get: (tab, res) => {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

        DB.Get(tab)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => {
            res.statusCode = 400;
            res.end(JSON.stringify({error: err.toString()}));
        });
    },
    post: (tab, body, res) => {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

        DB.Insert(tab, body)
        .then(results => res.end(JSON.stringify(results)))
        .catch(err => {
            res.statusCode = 400;
            res.end(JSON.stringify({error: err.toString()}));
        });
    },
    put: (tab, body, res) => {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

        DB.Update(tab, body)
        .then(results => {
            if (results[0]){
                res.end(JSON.stringify(body));
            }
            else {
                res.statusCode = 400;
                res.end(JSON.stringify({error: 'This records not founded'}));
            }
        })
        .catch(err => {
            res.statusCode = 400;
            res.end(JSON.stringify({error: err.toString()}));
        });
    },
    delete: (tab, id, res) => {
        res.writeHead(200, {'Content-Type': 'application/json; charset=utf-8'});

        let deleted;
        DB.GetOne(tab, id)
        .then((result) => {
            deleted = result;
            DB.Delete(tab, id)
            .then(results => {
                if (results)
                    res.end(JSON.stringify(deleted));
                else {
                    res.statusCode = 400;
                    res.end(JSON.stringify({error: 'This records not founded'}));
                }
            })
            .catch(err => {
                res.statusCode = 400;
                res.end(JSON.stringify({error: err.toString()}));
            });
        })
        .catch(err => {
            res.statusCode = 400;
            res.end(JSON.stringify({error: err.toString()}));
        });
    }
};
