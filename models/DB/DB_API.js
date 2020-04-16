const db = require('./DB_Handler');
const DB = new db();


module.exports = {
    get: (tab, res) => {
        DB.Get(tab)
        .then(results => {
            return results;
        })
        .catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    },
    search: (tab, option, res) => {
        DB.Search(tab, option)
        .then(results => {
            return results;
        })
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
                return results;
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
        DB.Delete(tab, id)
        .then(results => {
            if (results)
                return results;
            else {
                res.statusCode = 400;
                res.json({error: 'This records not founded'});
            }
        })
        .catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    }
};
