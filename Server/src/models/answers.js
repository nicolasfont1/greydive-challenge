const { DataTypes } = require('sequelize');

module.exports = (database) => {
  database.define('answers', { // Observar que en la database, este nombre se guarda en plural.
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    birth_date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country_of_origin: {
      type: DataTypes.STRING,
      allowNull: false
    },
    terms_and_conditions: {
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