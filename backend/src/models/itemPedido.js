//TABELA INTERMEDIARIA produtos_pedidos

const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');

const ItemPedido = sequelize.define('itemPedido', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    valorTotal: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = ItemPedido;