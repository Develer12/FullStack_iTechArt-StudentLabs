const Sequelize = require('sequelize');
let model = require('./Model/DB_Model');

const config =  require('./config');
let sequelize;

class DB {
    constructor(){
        sequelize = new Sequelize(config);
        sequelize.authenticate().then(()=>{
            console.log("DB Connected");

            model['pulpit'](Sequelize, sequelize)
            .belongsTo(model['faculty'](Sequelize, sequelize), {foreignKey: 'FK_PULPIT'});
            model['subject'](Sequelize, sequelize)
            .belongsTo(model['pulpit'](Sequelize, sequelize), {foreignKey: 'FK_SUBJECT_PULPIT'});
            model['teacher'](Sequelize, sequelize)
            .belongsTo(model['pulpit'](Sequelize, sequelize), {foreignKey: 'FK_TEACHER_PULPIT'});
            model['auditorium'](Sequelize, sequelize)
            .belongsTo(model['auditorium_type'](Sequelize, sequelize), {foreignKey: 'AUDITORIUM_TYPENAME_NOT_NULL'});

            sequelize.sync().then(result=>{console.log(result);})
            .catch(err=> console.log("SYNC ERROR: "+err));
        })
        .catch(err=>{console.log("Connection ERROR: "+err);});
    }

    Get(tab){
        return model[tab](Sequelize, sequelize).findAll();
    }

    GetOne(tab, id){
        return model[tab](Sequelize, sequelize).findOne({'where': {[tab]: id}});
    }

    Update(tab, body){
        return model[tab](Sequelize, sequelize).update(body.update, body.where);
    }

    Insert(tab, body){
        return model[tab](Sequelize, sequelize).create(body);
    }

    Delete(tab, id){
        return model[tab](Sequelize, sequelize).destroy({'where': {[tab]: id}});
    }
}

module.exports = DB;