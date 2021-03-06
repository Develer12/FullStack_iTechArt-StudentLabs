module.exports = {
  faculty: (Sequelize, sequelize) =>{
    return sequelize.define('FACULTY', {
        FACULTY: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        FACULTY_NAME: {
            type: Sequelize.STRING
        }
    });
  },
  pulpit: (Sequelize, sequelize) =>{
    return sequelize.define('PULPIT', {
        PULPIT: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        PULPIT_NAME: {
            type: Sequelize.STRING
        }
    });
  },
  subject: (Sequelize, sequelize) =>{
    return sequelize.define('SUBJECT', {
        SUBJECT: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        SUBJECT_NAME: {
            type: Sequelize.STRING
        }
    });
  },
  teacher: (Sequelize, sequelize) =>{
    return sequelize.define('TEACHER', {
        TEACHER: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        TEACHER_NAME: {
            type: Sequelize.STRING
        }
    });
  },
  auditorium_type: (Sequelize, sequelize) =>{
    return sequelize.define('AUDITORIUM_TYPE', {
        AUDITORIUM_TYPE: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        AUDITORIUM_TYPENAME: {
            type: Sequelize.STRING
        },
    });
  },
  auditorium: (Sequelize, sequelize) =>{
    return sequelize.define('AUDITORIUM', {
        AUDITORIUM: {
            type: Sequelize.STRING,
            primaryKey: true,
            allowNull: false
        },
        AUDITORIUM_NAME: {
            type: Sequelize.STRING
        },
        AUDITORIUM_CAPACITY: {
            type: Sequelize.INTEGER
        }
    });
  },
}
