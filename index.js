const server = require('./src/app.js');
const { conn, Category } = require('./src/db.js');
const { categories } = require('./src/helpers');

conn.sync({ force: true }).then(() => {
  Category.bulkCreate(categories)
  server.listen(process.env.PORT || 3001, () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  });
});