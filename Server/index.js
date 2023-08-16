// Requiero a server que es una instancia de Express.
// Requiero a conn que es la conexión con la database.
const server = require('./src/app.js');
const { conn } = require('./src/db.js');

// Sincronizo la database con el server.
conn.sync({ force: true }).then(() => {
  server.listen(3001, () => {
    console.log('Server listening on port: 3001.');
  });
});