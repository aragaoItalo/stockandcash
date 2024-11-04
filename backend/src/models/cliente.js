const { DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

const Cliente = sequelize.define('Cliente', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, //Aqui verificamos se o formato de email é válido
            notEmpty: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 30], //Min e Máx
                msg: "A senha deve ter entre 6 e 30 caracteres."
            },
            notEmpty: true
        }
    },
    storeName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }/*,
    endereco: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 255],
                msg: "O endereço deve ter entre 10 e 255 caracteres."
            },
            notEmpty: true
        }
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [10, 15],
                msg: "O telefone deve ter entre 10 e 15 caracteres"
            },
            notEmpty: true
        }
    }*/
}, { 
    hooks: {
        //ESSE HOOK CRIPTOGRAFA A SENHA ANTES DE SALVAR
        beforeCreate: async (cliente) => {
            const salt = await bcrypt.genSalt(10);
            cliente.password = await bcrypt.hash(cliente.password, salt);
        },
        //ESSE HOOK CRIPTOGRAFA A SENHA CASO SEJA ATUALIZADA 
        beforeUpdate: async (cliente) => {
            if (cliente.changed('password')) {
                const salt = await bcrypt.genSalt(10);
                cliente.password = await bcrypt.hash(cliente.password, salt);
            }
        }
    }    
});


//METODO QUE VERIFICA A SENHA (COMPARA A INSERIDA PELO USER COM A CRIPTOGRAFADA)
Cliente.prototype.validPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


module.exports = Cliente;