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
        employeeId: {
            type: Sequelize.STRING
        },
        jobTitle: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
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

const customer = (Sequelize, sequelize) =>{
    return sequelize.define('customerInfo', {
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
        order_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'orders',
                key: 'id'
            }
        }
    });
};

const product = (Sequelize, sequelize) =>{
    return sequelize.define('product', 
    {
        prod_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: false
        },
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(12,2)
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        currency: {
            type: Sequelize.STRING
        },
        order_id: {
            type: Sequelize.INTEGER,
            references: {
                model: 'orders',
                key: 'id'
            }
        }
    },
    {
        indexes: 
        [
            {
              unique: true,
              fields: ['prod_id', 'order_id']
            }
        ]
    });
};

module.exports = {
    order: (Sequelize, sequelize) => {return order(Sequelize, sequelize)},
    ship: (Sequelize, sequelize) => {return ship(Sequelize, sequelize)},
    processor: (Sequelize, sequelize) => {return processor(Sequelize, sequelize)},
    customer: (Sequelize, sequelize) => {return customer(Sequelize, sequelize)},
    product: (Sequelize, sequelize) => {return product(Sequelize, sequelize)}
};