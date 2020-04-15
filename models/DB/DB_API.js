const db = require('./DB_Handler');
const DB = new db();


module.exports = {
    get: (tab, res) => {
        DB.Get(tab)
        .then(results => res.json(results))
        .catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    },
    post: (tab, body, res) => {
        DB.Insert(tab, body)
        .then(results => res.json(results))
        .catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    },
    put: (tab, body, res) => {
        DB.Update(tab, body)
        .then(results => {
            if (results[0]){
                res.json(body);
            }
            else {
                res.statusCode = 400;
                res.json({error: 'This records not founded'});
            }
        })
        .catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    },
    delete: (tab, id, res) => {
        let deleted;
        DB.GetOne(tab, id)
        .then((result) => {
            deleted = result;
            DB.Delete(tab, id)
            .then(results => {
                if (results)
                    res.json(deleted);
                else {
                    res.statusCode = 400;
                    res.json({error: 'This records not founded'});
                }
            })
            .catch(err => {
                res.statusCode = 400;
                res.json({error: err.toString()});
            });
        })
        .catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    }
};
