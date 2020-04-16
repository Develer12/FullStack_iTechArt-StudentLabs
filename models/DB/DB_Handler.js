const Sequelize = require('sequelize');
let model = require('./Model/DB_Model');

const config =  require('./config');
let sequelize;

class DB {
    constructor(){
        sequelize = new Sequelize(config);
        sequelize.authenticate().then(()=>{
            let order = model['order'](Sequelize, sequelize);

            order.hasOne(model['ship'](Sequelize, sequelize));
            order.hasOne(model['processor'](Sequelize, sequelize));
            order.hasOne(model['customer'](Sequelize, sequelize));
            order.hasMany(model['product'](Sequelize, sequelize));


            sequelize.sync().then(result=>{
                console.log("DB Connected");
                console.log(result);
            })
            .catch(err=> console.log("SYNC ERROR: "+err));
        })
        .catch(err=>{console.log("Connection ERROR: "+err);});
    }

    Get(tab){
        return model[tab](Sequelize, sequelize).findAll();
    }

    Search(tab, option){
        return model[tab](Sequelize, sequelize).findAll(option);
    }

    GetOne(tab, id){
        return model[tab](Sequelize, sequelize).findOne({ where: {[tab]: id}});
    }

    Update(tab, body){
        let update = body.update_id;
        delete body.update_id;
        return model[tab](Sequelize, sequelize).update(body, { where: update});
    }

    Insert(tab, body){
        return model[tab](Sequelize, sequelize).create(body);
    }

    Delete(tab, id){
        return model[tab](Sequelize, sequelize).destroy({ where: id});
    }
}

module.exports = DB;