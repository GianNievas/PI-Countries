const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('activity', {
    ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dificultad: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    duracion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    temporada: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};