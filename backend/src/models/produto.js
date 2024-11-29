const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/db');
const Fornecedor = require('./fornecedor');

const Produto = sequelize.define('Produto', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    desconto: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

//RELACIONAR PRODUTO X FORNECEDOR

Produto.belongsTo(Fornecedor, {
    constraint: true, 
    foreignKey: 'fornecedorId', 
    as: 'fornecedor' 
});

module.exports = Produto;