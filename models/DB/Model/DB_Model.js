const Order = (Sequelize, sequelize) =>{
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
        shippedAt: {
            type: Sequelize.DATEONLY
        }
    });
};

const Ship = (Sequelize, sequelize) =>{
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
                model: order,
                key: 'id'
            }
        }
    });
};

const Processor = (Sequelize, sequelize) =>{
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
                model: order,
                key: 'id'
            }
        }
    });
};

const Customer = (Sequelize, sequelize) =>{
    return sequelize.define('customer', {
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
        address: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        order_id: {
            type: Sequelize.INTEGER,
            references: {
                model: order,
                key: 'id'
            }
        }
    });
};

const Product = (Sequelize, sequelize) =>{
    return sequelize.define('product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.INTEGER
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
                model: order,
                key: 'id'
            }
        }
    });
};

module.exports = {
    order: (Sequelize, sequelize) => {Order(Sequelize, sequelize)},
    ship: (Sequelize, sequelize) => {Ship(Sequelize, sequelize)},
    processor: (Sequelize, sequelize) => {Processor(Sequelize, sequelize)},
    customer: (Sequelize, sequelize) => {Customer(Sequelize, sequelize)},
    product: (Sequelize, sequelize) => {Product(Sequelize, sequelize)}
};
