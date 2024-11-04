//Carregar as variaveis de ambiente do arquivo .env:
require('dotenv').config({ path: '../.env' });


//TESTE DAS CREDENCIAIS
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);


//Conexão com o Sequelize
const{ Sequelize } = require('sequelize');

//Instancia
const sequelize = new Sequelize (process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
});

//Teste da conexão
sequelize.authenticate()
    .then(() => {
        console.log('Conectado ao MySQL usando o Sequelize');
    })
    .catch(err => {
        console.log('Não é possível conectar ao database: ', err);
    });

module.exports = sequelize;
