const Pedido = require('../models/pedido');
const Produto = require('../models/produto');

const criarPedido = async (req, res) => {
    const { cliente, telefone, endereco, produtos } = req.body;

    console.log("Produtos recebidos:", produtos);
    console.log(req.body);

    try {
      //Valida os dados
      if (!cliente || !telefone || !endereco || !produtos || produtos.length === 0) {
        return res.status(400).json({ message: 'Dados do pedido incompletos.' });
      }

      let total = 0;

      //Verifica estoque e atualiza
      for (const item of produtos) {
        const produto = await Produto.findByPk(item.id);

        if (!produto) {
          return res.status(404).json({ message: `Produto com ID ${item.id} não encontrado.` });
        }

        if (produto.quantidade < item.quantidade) {
          return res.status(400).json({
            message: `Estoque insuficiente para o produto: ${produto.nome}. Disponível: ${produto.quantidade}`,
          });
        }
      
      const valorTotal = produto.preco * item.quantidade;

      //Calcula total do pedido
      total += valorTotal;

      //Atualiza estoque
      produto.quantidade -= item.quantidade;
      await produto.save();
    }

      //Cria pedido
      const novoPedido = await Pedido.create({
        cliente,
        telefone,
        endereco,
        produtos,
        total,
        data: new Date(),
      });

      for (const item of produtos) {
        const produto = await Produto.findByPk(item.id);
        const valorTotal = produto.preco * item.quantidade;

        // Assumindo que você tenha uma tabela intermediária ou algo do tipo
        await novoPedido.addProduto(produto, {
          through: { 
            quantidade: item.quantidade, 
            valorTotal: valorTotal  // Aqui é onde você usa o valorTotal
          }
        });
      }

      res.status(201).json({ message: 'Pedido criado com sucesso.', pedido: novoPedido });
    } catch (error) {
      console.error('Erro ao criar o pedido:', error);
      res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

const listarPedidos = async (req, res) => {
    try {
        const pedidos = await Pedido.findAll({
            include: [
                {
                    model: Produto,
                    through: { 
                      attributes: ['quantidade', 'valorTotal'] 
                    }
                }
            ]
        });
        res.status(200).json(pedidos);
    } catch (error) {
        console.error('Erro ao listar pedidos:', error);
        res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

module.exports = {
  criarPedido,
  listarPedidos
};