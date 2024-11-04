const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Cliente = require('./cliente');


const Notificacao = sequelize.define('Notificacao', {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mensagem: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    lida: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
});

// Relacionamento: a notificação pertence a um cliente
Notificacao.belongsTo(Cliente, {
    foreignKey: 'clienteId'
});


module.exports = Notificacao;