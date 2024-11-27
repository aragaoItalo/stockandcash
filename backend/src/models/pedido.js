const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js');


const Pedido = sequelize.define('Pedido', {
    cliente: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endereco: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    produtos: {
      type: DataTypes.JSON, 
      allowNull: false,
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    data: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  });
  
  module.exports = Pedido;  