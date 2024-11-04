const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.js'); 
const Cliente = require('./cliente.js');


const Pedido = sequelize.define('Pedido', {
    status: {
        type: DataTypes.ENUM('Pendente', 'Em processamento', 'Enviado', 'Entregue'),
        defaultValue: 'Pendente',
        allowNull: false
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

//RELACIONAR PEDIDO QUE PERTENCE AO CLIENTE
Pedido.belongsTo(Cliente, {
    foreignKey: 'clienteId'
});


module.exports = Pedido;