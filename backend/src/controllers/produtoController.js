const Produto = require('../models/produto');
const Fornecedor = require('../models/fornecedor');


// Cria produto c fornecedor
exports.createProduto = async (req, res) => {
    try {
        const { nome, preco, desconto, quantidade, categoria, descricao, fornecedorId} = req.body;

        // Valida se o fornecedor existe
        if (fornecedorId) {
            const fornecedor = await Fornecedor.findByPk(fornecedorId);
            if (!fornecedor) {
                return res.status(404).json({ error: 'Fornecedor não encontrado' });
            }
        }

        const produto = await Produto.create({ 
            nome, preco, desconto, quantidade, categoria, descricao, fornecedorId 
        });
        res.status(201).json(produto);
        
    } catch (err) {
        console.error('Erro no backend ao criar o produto:', err);
        res.status(500).json({ error: 'Erro ao criar produto', detalhes: err.message });
    }
};

/*
// Cria produto sem fornecedor
exports.createProduto = async (req, res) => {
    try {
        const { nome, preco, desconto, quantidade, categoria, descricao } = req.body;

        const produto = await Produto.create({ nome, preco, desconto, quantidade, categoria, descricao });
        res.status(201).json(produto);
    } catch (err) {
        console.error('Erro no backend ao criar o produto:', err);
        res.status(500).json({ error: 'Erro ao criar produto', detalhes: err.message });
    }
};
*/

// Lista os produtos
exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll({
            include: {
                model: Fornecedor,
                as: 'fornecedor',
                attributes: ['id', 'nome']
            }
        });
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar produtos', detalhes: err.message });
    }
};

/*exports.getAllProdutos = async (req, res) => {
    try {
        const produtos = await Produto.findAll();
        res.status(200).json(produtos);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao listar produtos', detalhes: err.message });
    }
};*/

// Busca pelo id
exports.getProdutoById = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id, {
            include: {
                model: Fornecedor,
                as: 'fornecedor',
                attributes: ['id', 'nome']
            }
        });
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar produto', detalhes: err.message });
    }
};

/*exports.getProdutoById = async (req, res) => {
    try {
        const produto = await Produto.findByPk(req.params.id);
        if (!produto) {
            return res.status(404).json({ error: 'Produto não encontrado' });
        }
        res.status(200).json(produto);
    } catch (err) {
        res.status(500).json({ error: 'Erro ao buscar produto', detalhes: err.message });
    }
};*/

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
