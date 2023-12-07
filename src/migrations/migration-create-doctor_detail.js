'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('doctor_details', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            doctorID: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            introduction: {
                type: Sequelize.TEXT('long'),
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT('long'),
                allowNull: false
            },
            provinceID: {
                type: Sequelize.STRING,
                allowNull: false
            },
            priceID: {
                type: Sequelize.STRING,
                allowNull: false
            },
            paymentID: {
                type: Sequelize.STRING,
                allowNull: false
            },
            clinicName: {
                type: Sequelize.STRING,
                allowNull: false
            },
            clinicAddress: {
                type: Sequelize.STRING,
                allowNull: false
            },
            note: {
                type: Sequelize.STRING,
                allowNull: true
            },
            count: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('doctor_details');
    }
};  