const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
//const Produto = require('./produto')

const Fornecedor = sequelize.define('Fornecedor', {
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cnpj: {
        type: DataTypes.STRING,
        allowNull:false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

/*
Fornecedor.hasMany(Produto, {
    foreignKey: 'fornecedorId', // Nome da chave estrangeira no Produto
    as: 'produtos' // Nome do relacionamento (alias)
});
*/

module.exports = Fornecedor;