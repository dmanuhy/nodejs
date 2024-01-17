'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Doctor_Detail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Doctor_Detail.belongsTo(models.User, { foreignKey: `doctorID` })
            Doctor_Detail.belongsTo(models.AllCode, { foreignKey: `provinceID`, targetKey: `key`, as: `provinceData` });
            Doctor_Detail.belongsTo(models.AllCode, { foreignKey: `priceID`, targetKey: `key`, as: `priceData` });
            Doctor_Detail.belongsTo(models.AllCode, { foreignKey: `paymentID`, targetKey: `key`, as: `paymentData` });
            Doctor_Detail.belongsTo(models.Specialty, { foreignKey: `specialtyID`, targetKey: `id`, as: `specialtyData` });
        }
    };
    Doctor_Detail.init({
        doctorID: DataTypes.INTEGER,
        introduction: DataTypes.TEXT('long'),
        description: DataTypes.TEXT('long'),
        specialtyID: DataTypes.INTEGER,
        clinicID: DataTypes.INTEGER,
        provinceID: DataTypes.STRING,
        priceID: DataTypes.STRING,
        paymentID: DataTypes.STRING,
        clinicName: DataTypes.STRING,
        clinicAddress: DataTypes.STRING,
        note: DataTypes.STRING,
        count: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'Doctor_Detail',
    });
    return Doctor_Detail;
};