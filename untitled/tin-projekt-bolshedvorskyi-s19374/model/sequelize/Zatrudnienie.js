const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

    const Zatrudnienie = sequelize.define('Zatrudnienie', {
        _id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        lekarzId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Pole jest wymagane"
                },
            }
        },
        klinikaId: {
            type: Sequelize.INTEGER,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Pole jest wymagane"
                },
            }
        },
        salary: {
            type: Sequelize.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Pole jest wymagane"
                },
            }
        },
        dateFrom: {
            type: Sequelize.DATE,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "Pole jest wymagane"
                },
                isDate: {
                    msg: "Pole powinno zawierać prawidlowa data"
                }
            }
        },
        dateTo: {
            type: Sequelize.DATE,
            allowNull: true,
            validate: {
                isDate: {
                    msg: "Pole powinno zawierać prawidlowa data"
                }
            }
        }



    });
    module.exports = Zatrudnienie;
