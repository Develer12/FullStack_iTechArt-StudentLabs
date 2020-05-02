const Sequelize = require('sequelize');
let model = require('./Model/DB_Model');

const config =  require('./config');
let sequelize;

class DB {
    constructor(){
        sequelize = new Sequelize(config);
        sequelize.authenticate().then(()=>{
            let childOption = {
                onDelete: 'CASCADE',
                hooks: true
            };
  
            let order = model['order'](Sequelize, sequelize);
            let ship = model['ship'](Sequelize, sequelize);
            let processor = model['processor'](Sequelize, sequelize);
            let customer = model['customer'](Sequelize, sequelize);
            let product = model['product'](Sequelize, sequelize);
            let listproduct = model['listproduct'](Sequelize, sequelize);

            customer.belongsTo(ship);
            order.belongsTo(processor);
            order.belongsTo(customer);
            childOption.foreignKey = 'prod_id';
            product.belongsTo(listproduct, childOption);
            childOption.foreignKey = 'order_id';
            order.hasMany(product, childOption);

            sequelize.sync().catch(err=> console.log("SYNC ERROR: "+err));
        })
        .catch(err=>{console.log("Connection ERROR: "+err);});
    }

    Get(tab){
        return model[tab](Sequelize, sequelize).findAll();
    }

    Search(tab, option){
        /*
        if(option.join){
            option.include = [];
            option.join.forEach(el => {
                option.include.push({
                    model: model[el](Sequelize, sequelize),
                    as: el
                });
            });
            delete option.join;
        }
        console.log(option)
        */
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