const order = (Sequelize, sequelize) =>{
    return sequelize.define('order', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        customer: {
            type: Sequelize.STRING
        },
        employeeId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'processors',
                key: 'id'
            }
        },
        addresseeId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'addresseeInfos',
                key: 'id'
            }
        },
        status: {
            type: Sequelize.STRING
        },
        acceptedAt: {
            type: Sequelize.DATEONLY
        },
        shippedAt: {
            type: Sequelize.DATEONLY
        }
    });
};

const ship = (Sequelize, sequelize) =>{
    return sequelize.define('ship', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        address: {
            type: Sequelize.STRING
        },
        zip: {
            type: Sequelize.STRING
        },
        region: {
            type: Sequelize.STRING
        },
        country: {
            type: Sequelize.STRING
        }
    });
};

const processor = (Sequelize, sequelize) =>{
    return sequelize.define('processor', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        jobTitle: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        }
    });
};

const customer = (Sequelize, sequelize) =>{
    return sequelize.define('addresseeInfo', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        shipId: {
            type: Sequelize.INTEGER,
            references: {
                model: 'ships',
                key: 'id'
            }
        }
    });
};

const listproduct = (Sequelize, sequelize) =>{
    return sequelize.define('listproduct', 
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(12,2)
        },
        currency: {
            type: Sequelize.STRING
        }
    });
};

const product = (Sequelize, sequelize) =>{
    return sequelize.define('product', 
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        prod_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'listproducts',
                key: 'id'
            }
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        order_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'orders',
                key: 'id'
            }
        }
    });
};

module.exports = {
    order: (Sequelize, sequelize) => {return order(Sequelize, sequelize)},
    ship: (Sequelize, sequelize) => {return ship(Sequelize, sequelize)},
    processor: (Sequelize, sequelize) => {return processor(Sequelize, sequelize)},
    customer: (Sequelize, sequelize) => {return customer(Sequelize, sequelize)},
    product: (Sequelize, sequelize) => {return product(Sequelize, sequelize)},
    listproduct: (Sequelize, sequelize) => {return listproduct(Sequelize, sequelize)}
};