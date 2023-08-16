require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

// Declaro la database, que es una nueva instancia de Sequelize.
const database = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/greydive`, {
  logging: false, // Toggle para los console.log de las consultas raw en SQL.
  native: false, // Le avisa a Sequelize que puede usar pg-native (para mayor performance).
});
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta models, los requerimos y agregamos al arreglo modelDefiners.
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Inyectamos la conexion (database) a todos los modelos.
modelDefiners.forEach(model => model(database));
// Capitalizamos los nombres de los modelos, ej: product => Product.
let entries = Object.entries(database.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
database.models = Object.fromEntries(capsEntries);

// En database.models están todos los modelos importados como propiedades,
// para relacionarlos hago un destructuring.
const { User, Answers } = database.models;

// Relaciones de modelos.
Answers.belongsTo(User, {
  foreignKey: "userId", timestamps: false
});

module.exports = {
  ...database.models, // para poder importar los modelos así: const { User } = require('./db.js');
  conn: database,     // para importart la conexión { conn } = require('./db.js');
};