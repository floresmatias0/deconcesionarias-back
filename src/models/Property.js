const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('property', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        categoryId: {
            allowNull: false,
            onDelete: 'NO ACTION',
            onUpdate: 'CASCADE',
            references: {
                model: 'categories',
                key: 'id',
            },
            type: DataTypes.INTEGER,
        }
    }, {
        paranoid: true,
        timestamps: true
    });
};