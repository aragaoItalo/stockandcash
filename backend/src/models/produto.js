const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Fornecedor = require('./fornecedor.js');


const Produto = sequelize.define('Produto', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

//RELACIONAR PRODUTO X FORNECEDOR
Produto.belongsTo(Fornecedor, {
    foreignKey: 'fornecedorID'
});


module.exports = Produto;