const Produto = require('../models/produto');

// Cria produto
exports.createProduto = async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).json(produto);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao criar produto' });
    }
};

// Lista os produtos
exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar produtos' });
    }
};

// Busca pelo id
exports.getProdutoById = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar produto' });
    }
};

// Atualiza pelo id
exports.updateProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        await produto.update(req.body);
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao atualizar produto' });
    }
};

// Deleta pelo id
exports.deleteProduto = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        await produto.destroy();
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Erro ao deletar produto' });
    }
};
