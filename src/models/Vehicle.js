const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('vehicle', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        paranoid: true,
        timestamps: true
    });
};