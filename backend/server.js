//Carregar variaveis de ambiente
require('dotenv').config();

//Modelos
const Cliente = require('./src/models/cliente.js');
const Fornecedor = require('./src/models/fornecedor.js');
const Produto = require('./src/models/produto.js');

//Import Pacotes e Módulos
const express = require('express');
const cors = require('cors');
const sequelize = require('./src/config/db.js');
const authRoutes = require('./src/routes/authRoutes');
const clienteRoutes = require('./src/routes/clienteRoutes.js');
const produtoRoutes = require('./src/routes/produtoRoutes.js');
const fornecedorRoutes = require('./src/routes/fornecedorRoutes.js');

//Config Express
const app = express();
const port = process.env.PORT || 3000;

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/auth', authRoutes);
app.use('/clientes', clienteRoutes);
app.use('/produtos', produtoRoutes);
app.use('/fornecedores', fornecedorRoutes);

//Rota Simples p teste do server
app.get('/', (req, res) => {
    res.send('Servidor funcionando!');
});

//Inicialização do server
app.listen(port, () => {
    console.log(`Servidor está rodando na porta ${port}`);
});

//SINCRONIZAR COM O DB
sequelize.sync() //ALTER:TRUE ajustar tabela sem perder dados
    .then(() => {
        console.log('Tabelas sincronizadas com sucesso!');
    })
    .catch(err => {
        console.error('Erro ao sincronizar tabelas:', err);
    });