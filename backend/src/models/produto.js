const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Fornecedor = require('./fornecedor.js');


const Produto = sequelize.define('Produto', {
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
    }/*,
    imagem: {
        type: DataTypes.STRING,
        allowNull: true
    }*/
});

//RELACIONAR PRODUTO X FORNECEDOR
//Produto.belongsTo(Fornecedor, {
//    foreignKey: 'fornecedorID'
//});


module.exports = Produto;