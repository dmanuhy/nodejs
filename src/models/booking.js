'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Booking.init({
        statusID: DataTypes.STRING,
        userID: DataTypes.INTEGER,
        doctorID: DataTypes.INTEGER,
        patientName: DataTypes.STRING,
        gender: DataTypes.STRING,
        phoneNumber: DataTypes.STRING,
        dob: DataTypes.DATE,
        reason: DataTypes.TEXT,
        date: DataTypes.DATE,
        timetype: DataTypes.STRING,
        token: DataTypes.TEXT('long')
    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};