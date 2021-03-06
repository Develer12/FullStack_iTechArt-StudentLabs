const db = require('./DB_Handler');
const DB = new db();


module.exports = {
    get: (tab, res) => {
        return DB.Get(tab)
        .then(results => {
            return results;
        })
        .catch(err => {
            res.statusCode = 400;
                            
            console.log(err);

            res.json({error: err.toString()});
        });
    },
    search: (tab, option, res) => {
        return DB.Search(tab, option)
        .then(results => {
            return results;
        })
        .catch(err => {
            res.statusCode = 400;
                            
            console.log(err);

            res.json({error: err.toString()});
        });
    },
    raw: (raw, res) => {
        return DB.RawQuery(raw)
        .then(results => {
            return results;
        })
        .catch(err => {
            res.statusCode = 400;
                            
            console.log(err);

            res.json({error: err.toString()});
        });
    },
    post: (tab, body, res) => {
        return DB.Insert(tab, body)
        .then(results => {
            res.json({});
        })
        .catch(err => {
            console.log(err.parent.number)
            res.statusCode = 400;
            err = (err.parent.number == 2627 && tab == 'order')
                ? `Order ID ${body.id} is booked. Order ID must be unique, try another ID`
                : err.toString();
            res.json({error: err});
        });
    },
    put: (tab, body, res) => {
        return DB.Update(tab, body)
        .then(results => {
            if (results[0]){
                res.json({});
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
        return DB.Delete(tab, id)
        .then(results => {
            if (results)
                res.json({});
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
