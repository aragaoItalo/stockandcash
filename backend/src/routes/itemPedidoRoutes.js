const express = require('express');
const router = express.Router();
const itemPedidoController = require('../controllers/itemPedidoController');

router.post('/', itemPedidoController.createItemPedido);
router.get('/', itemPedidoController.getAllItensPedidos);
router.get('/:id', itemPedidoController.getItemPedidoById);
router.put('/:id', itemPedidoController.updateItemPedido);
router.delete('/:id', itemPedidoController.deleteItemPedido);

module.exports = router;