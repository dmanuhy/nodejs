'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('bookings', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            statusID: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userID: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            doctorID: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            patientName: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            gender: {
                type: Sequelize.STRING
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dob: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            reason: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            date: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            timetype: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            token: {
                type: Sequelize.TEXT('long'),
                allowNull: false,
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
        await queryInterface.dropTable('bookings');
    }
};