const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const Pedido = require('./pedido');


const Pagamento = sequelize.define('Pagamento', {
    metodo: {
        type: DataTypes.ENUM('cartao', 'paypal', 'stripe'),
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('pendente', 'pago', 'cancelado'),
        defaultValue: 'pendente'
    },
    valor: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

// RELACIONAR O PAGAMENTO COM O PEDIDO
Pagamento.belongsTo(Pedido, {
    foreignKey: 'pedidoId' 
});


module.exports = Pagamento;