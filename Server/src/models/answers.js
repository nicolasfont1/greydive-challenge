const { DataTypes } = require('sequelize');

module.exports = (database) => {
  database.define('answers', { // Observar que en la database, este nombre se guarda en plural.
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    completeName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birthdate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    terms: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" }
    }
  }, {
    timestamps: false
  });
};