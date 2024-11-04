const Pedido = require('../models/pedido');
const ItemPedido = require('../models/itemPedido');

// Cria pedido
exports.createPedido = async (req, res) => {
    try {
        const { clienteId, itens, total } = req.body; // Assumindo que `itens` e `total` são fornecidos
        const pedido = await Pedido.create({ clienteId, total });
        
        // Cria os itens do pedido
        const itensCriados = await Promise.all(
            itens.map(async (item) => {
                return await ItemPedido.create({
                    pedidoId: pedido.id,
                    produtoId: item.produtoId,
                    quantidade: item.quantidade,
                    preco: item.preco
                });
            })
        );
        
        res.status(201).json({ pedido, itensCriados });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar pedido' });
    }
};

// Obtem todos os pedidos
exports.getAllPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [ItemPedido] // Inclui itens do pedido na resposta
        });
        res.status(200).json(pedidos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar pedidos' });
    }
};

// Obtem pedido pelo id
exports.getPedidoById = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id, {
            include: [ItemPedido]
        });
        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }
        res.status(200).json(pedido);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao buscar o pedido' });
    }
};

// Atualiza um pedido (adiciona item, altera quantidade)
exports.updatePedido = async (req, res) => {
    try {
        const { clienteId, total, itens } = req.body;
        const pedido = await Pedido.findByPk(req.params.id);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        // Atualiza o pedido
        await pedido.update({ clienteId, total });

        // Atualiza os itens do pedido
        const updatedItens = await Promise.all(
            itens.map(async (item) => {
                const itemExistente = await ItemPedido.findOne({
                    where: { id: item.id, pedidoId: pedido.id }
                });
                if (itemExistente) {
                    return await itemExistente.update({
                        quantidade: item.quantidade,
                        preco: item.preco
                    });
                } else {
                    return await ItemPedido.create({
                        pedidoId: pedido.id,
                        produtoId: item.produtoId,
                        quantidade: item.quantidade,
                        preco: item.preco
                    });
                }
            })
        );

        res.status(200).json({ pedido, updatedItens });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o pedido' });
    }
};

// Atualiza o status de um pedido (adm)
exports.updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const pedido = await Pedido.findByPk(req.params.id);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        await pedido.update({ status });
        res.status(200).json({ message: 'Status do pedido atualizado', pedido });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o status do pedido' });
    }
};

// Deleta pedido
exports.deletePedido = async (req, res) => {
    try {
        const pedido = await Pedido.findByPk(req.params.id);

        if (!pedido) {
            return res.status(404).json({ error: 'Pedido não encontrado' });
        }

        await pedido.destroy();
        res.status(200).json({ message: 'Pedido deletado com sucesso' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao deletar o pedido' });
    }
};