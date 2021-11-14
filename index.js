const server = require('./src/app.js');
const { conn, Category, Property } = require('./src/db.js');
const {
  categories,
  properties
} = require('./src/helpers');

conn.sync({ force: true }).then(() => {
  Category.bulkCreate(categories)
  Property.bulkCreate(properties)
  server.listen(process.env.PORT || 3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  });
});