const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('value', {
        value: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        propertyId: {
            allowNull: true,
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
            references: {
                model: 'properties',
                key: 'id',
            },
            type: DataTypes.INTEGER,
        },
        vehicleId: {
            allowNull: true,
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
            references: {
                model: 'vehicles',
                key: 'id',
            },
            type: DataTypes.INTEGER,
        },
        propertyName: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        paranoid: true,
        timestamps: true
    });
};