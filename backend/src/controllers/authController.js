const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Cliente = require('../models/cliente');

//Registra cliente (SIGNUP)
exports.signup = async (req, res) => {
    const { firstName, lastName, email, storeName, password } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!firstName || !lastName || !email || !storeName || !password) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verifica o comprimento da senha
    if (password.length < 6 || password.length > 30) {
        return res.status(400).json({ error: 'A senha deve ter entre 6 e 30 caracteres.' });
    }


    try {
        // Verifica se o cliente já está registrado
        const clienteExistente = await Cliente.findOne({ where: { email } });
        if (clienteExistente) {
            return res.status(400).json({ error: 'E-mail já está registrado' });
        }
        
        //console.log('Iniciando o hash da senha...');
        //const hashedPassword = await bcrypt.hash(senha, 10);
        //console.log('Hash da senha concluído:', hashedPassword);

        // Criar o cliente no banco de dados
        const novoCliente = await Cliente.create({
            firstName,
            lastName,
            email,
            password,
            storeName,
        });

        res.status(201).json({ message: 'Cliente registrado com sucesso', clienteId: novoCliente.id });
    } catch (error) {
        console.error('Erro ao registrar cliente:', error);
        res.status(500).json({ error: 'Erro ao registrar cliente' });
    }
};

// Login do cliente (SIGNIN)
exports.signin = async (req, res) => {
    const { email, password } = req.body;


    // Verifica se todos os campos obrigatórios estão presentes
    if (!email || !password) {
        return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }


    try {
        // Verifica se o cliente existe
        const cliente = await Cliente.findOne({ where: { email } });
        if (!cliente) {
            return res.status(400).json({ error: 'E-mail ou senha inválidos' });
        }

        // Comparar senhas
        const senhaCorreta = await bcrypt.compare(password, cliente.password);
        if (!senhaCorreta) {
            return res.status(400).json({ error: 'E-mail ou senha inválidos' });
        }
        
        // Gerar token JWT -> Usado para autenticação
        const token = jwt.sign(
            { id: cliente.id, email: cliente.email },
            process.env.JWT_SECRET, // Chave secreta definida no .env
            { expiresIn: '1h' } //Tempo para o token expirar
        );

        res.status(200).json({ message: 'Login bem-sucedido', token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao fazer login' });
    }
};