const Sequelize = require('sequelize');
let model = require('./Model/DB_Model');

const config =  require('./config');
let sequelize;

class DB {
    constructor(){
        sequelize = new Sequelize(config.server);
        sequelize.authenticate().then(()=>{
            let childOption = {};
  
            let ship = model['ship'](Sequelize, sequelize);
            let customer = model['customer'](Sequelize, sequelize);
            let processor = model['processor'](Sequelize, sequelize);
            let order = model['order'](Sequelize, sequelize);
            let product = model['product'](Sequelize, sequelize);
            let listproduct = model['listproduct'](Sequelize, sequelize);

            customer.belongsTo(ship);
            childOption.foreignKey = 'addresseeId';
            order.belongsTo(customer, childOption);
            childOption.foreignKey = 'employeeId';
            order.belongsTo(processor, childOption);

            childOption = {
                onDelete: 'CASCADE',
                hooks: true,
                foreignKey: 'prod_id',
            };
            listproduct.hasMany(product, childOption);
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
                    required: true,
                    as: el
                });
            });
            delete option.join;
            //option.include = [{all: true}]
        }
        */
        return model[tab](Sequelize, sequelize).findAll(option);
    }

    RawQuery(raw){
        return sequelize.query(raw);
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