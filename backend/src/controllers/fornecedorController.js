const Fornecedor = require('../models/fornecedor');

//Cria o fornecedor
exports.createFornecedor = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.create(req.body);
        res.status(201).json(fornecedor);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar novo Fornecedor'});
    }
};

// Lista os produtos
exports.getAllFornecedores = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findAll();
        res.status(200).json(fornecedor);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar fornecedores' });
    }
};

//Busca pelo id
exports.getFornecedorById = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByPk(req.params.id);
        if (!fornecedor) {
            return res.status(404).json({ error: 'Fornecedor não encontrado' });
        }
        res.status(200).json(fornecedor);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar fornecedor'});
    }
};

//Atualiza pelo id
exports.updateFornecedor = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByPk(req.params.id);
        if (!fornecedor) {
            return res.status(404).json({ error: 'Fornecedor não encontrado' });
        }
        await fornecedor.update(req.body);
        res.status(200).json(fornecedor);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar fornecedor' });
    }
};

//Deleta pelo id
exports.deleteFornecedor = async (req, res) => {
    try {
        const fornecedor = await Fornecedor.findByPk(req.params.id);
        if (!fornecedor) {
            return res.status(404).json({ error: 'Fornecedor não encontrado' });
        }
        await fornecedor.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar fornecedor' });
    }
};
