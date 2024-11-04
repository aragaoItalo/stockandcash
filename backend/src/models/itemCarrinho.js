const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Carrinho = require('./carrinho');
const Produto = require('./produto');


const ItemCarrinho = sequelize.define('ItemCarrinho', {
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precoUnitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});


// RELACIONAMENTO
ItemCarrinho.belongsTo(Carrinho, {
    foreignKey: 'carrinhoId'
});
ItemCarrinho.belongsTo(Produto, {
    foreignKey: 'produtoId'
});


module.exports = ItemCarrinho;