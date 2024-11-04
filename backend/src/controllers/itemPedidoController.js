const ItemPedido = require('../models/itemPedido');
const Pedido = require('../models/pedido');
const Produto = require('../models/produto');

//Cria novo item do pedido
exports.createItemPedido = async (req, res) => {
    try{
        const {produtoId, quantidade, precoUnitario, pedidoId} = req.body;

        const pedido = await Pedido.findByPk(pedidoId);
        const produto = await Produto.findByPk(produtoId);

        if(!pedido || !produto) {
            return res.status(404).json({ message: 'Pedido ou Produto não encontrado'});
        }

        const novoItemPedido = await ItemPedido.create({
            produtoId,
            quantidade,
            precoUnitario,
            pedidoId,
        });

        res.status(201).json(novoItemPedido);
    } catch(error) {
        res.status(500).json({ message: 'Erro ao criar item do pedido', error });
    }
};

//Busca todos os itens do pedido
exports.getAllItensPedidos = async (req, res) => {
    try {
        const itensPedido = await ItemPedido.findAll({
            include: [ 
                { model: Pedido, attributes: ['id','status']},
                { model: Produto, attributes: ['id', 'nome', 'preco']},
            ],
        });

        res.status(200).json(ItemPedido);
    } catch (error) {
        res.status(500).json ({ message: 'Erro ao buscar itens do pedido', error});
    }
};

//Busca pelo Id
exports.getItemPedidoById = async (req, res) => {
    try {
        const { id } = req.params;
        const itemPedido = await ItemPedido.findByPk(id, { 
            include: [
                { model: Pedido, attributes: ['id', 'status'] },
                { model: Produto, attributes: ['id', 'nome', 'preco'] },
            ],
        });

        if (!itemPedido) {
            return res.status(404).json({ message: 'Item do pedido não encontrado'});
        }

        res.status(200).json(itemPedido);
    } catch(error) {
        res.status(500).json({ messsage: 'Erro ao buscar item de pedido', error});
    }
};

//Atualiza item do pedido
exports.updateItemPedido = async (req, res) => {
    try {
      const { id } = req.params;
      const { produtoId, quantidade, precoUnitario, pedidoId } = req.body;
  
      const itemPedido = await ItemPedido.findByPk(id);
  
      if (!itemPedido) {
        return res.status(404).json({ message: 'Item de pedido não encontrado' });
      }
  
      // Atualiza os campos 
      itemPedido.produtoId = produtoId;
      itemPedido.quantidade = quantidade;
      itemPedido.precoUnitario = precoUnitario;
      itemPedido.pedidoId = pedidoId;
  
      await itemPedido.save();
  
      res.status(200).json(itemPedido);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar item de pedido', error });
    }
  };
  
//Deleta item do pedido
  exports.deleteItemPedido = async (req, res) => {
    try {
      const { id } = req.params;
      const itemPedido = await ItemPedido.findByPk(id);
  
      if (!itemPedido) {
        return res.status(404).json({ message: 'Item de pedido não encontrado' });
      }
  
      await itemPedido.destroy();
  
      res.status(200).json({ message: 'Item de pedido deletado com sucesso' });
    } catch (error) {
      res.status(500).json({ message: 'Erro ao deletar item de pedido', error });
    }
  };