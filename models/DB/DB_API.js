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
    post: (tab, body, res) => {
        return DB.Insert(tab, body)
        .then(results => {
            return results;
        })
        .catch(err => {
            res.statusCode = 400;
                
            console.log(err);

            res.json({error: err.toString()});
        });
    },
    put: (tab, body, res) => {
        return DB.Update(tab, body)
        .then(results => {
            if (results[0]){
                return results;
            }
            else {
                res.statusCode = 400;
                
                console.log(err);

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
                return results;
            else {
                res.statusCode = 400;
                                
                console.log(err);

                res.json({error: 'This records not founded'});
            }
        })
        .catch(err => {
            res.statusCode = 400;
            res.json({error: err.toString()});
        });
    }
};
