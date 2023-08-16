const { DataTypes } = require('sequelize');

module.exports = (database) => {
  database.define('user', { // Observar que en la database, este nombre se guarda en plural.
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false
  });
};