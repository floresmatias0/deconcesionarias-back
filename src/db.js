require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');

const sequelize = new Sequelize(`${process.env.DATABASE_URL}?sslmode=require`, {
  url: process.env.DATABASE_URL,
  dialect: 'postgres',
  logging: false,
  native: false,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // very important
    }
  }
});

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Vehicle, Value, Category, Property } = sequelize.models;

Category.hasMany(Property);
Property.belongsTo(Category, {
  foreignKey: 'categoryId'
})

Property.hasMany(Value);
Value.belongsTo(Property, {
  foreignKey: 'propertyId'
})

Vehicle.hasMany(Value);
Value.belongsTo(Vehicle, {
  foreignKey: 'vehicleId'
})

Vehicle.belongsToMany(Property, {
  through: 'vehicle_property',
  as: 'property'
});
Property.belongsToMany(Vehicle, {
  through: 'vehicle_property',
  as: 'vehicle'
})

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};