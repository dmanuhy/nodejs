'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class AllCode extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            AllCode.hasMany(models.User, { foreignKey: 'positionID', as: 'positionData' });
            AllCode.hasMany(models.User, { foreignKey: 'gender', as: 'genderData' });
            AllCode.hasMany(models.Doctor_Detail, { foreignKey: 'provinceID', as: 'provinceData' });
            AllCode.hasMany(models.Doctor_Detail, { foreignKey: 'priceID', as: 'priceData' });
            AllCode.hasMany(models.Doctor_Detail, { foreignKey: 'paymentID', as: 'paymentData' });
            AllCode.hasMany(models.Schedule, { foreignKey: 'timeType', as: 'timeData' });
        }
    };
    AllCode.init({
        key: DataTypes.STRING,
        type: DataTypes.STRING,
        valueEN: DataTypes.STRING,
        valueVI: DataTypes.STRING,
        valueJA: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'AllCode',
    });
    return AllCode;
};